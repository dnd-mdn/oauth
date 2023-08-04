/**
 * Perform OAuth authentication through web application flow
 * @see https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
 */

import { Octokit } from 'https://cdn.jsdelivr.net/npm/@octokit/rest@20.0.1/+esm'

/**
 * Manipulate current URL
 * @type {Object}
 */
const url = {

    /**
     * Test if parameter(s) are set
     * @param {...string} args Parameter names
     * @returns {boolean}
     */
    has: (...args) => {
        const params = new URLSearchParams(window.location.search)

        for (let i = 0; i < args.length; i++) {
            if (!params.has(args[i])) {
                return false
            }
        }

        return true
    },

    /**
     * Remove parameter(s) and return them
     * @param {...string} args Parameter names
     * @returns {Object}
     */
    pull: (...args) => {
        const params = new URLSearchParams(window.location.search)
        let obj = {}

        for (let i = 0; i < args.length; i++) {
            obj[args[i]] = params.get(args[i])
            params.delete(args[i])
        }

        history.replaceState(null, '', '?' + params)
        return obj
    }
}




/**
 * GitHub OAuth web flow
 * @class
 */
export class GitHubOauthClient {

    constructor(opts = {}) {
        this.clientId = opts.clientId || '6502d8679dcf3f0105f8'
        this.codeExchangeURL = opts.codeExchangeURL || 'https://caf-fac.ca/gh.asp'
        this.rest = new Octokit({ auth: this.token })
    }

    get token() {
        return localStorage.getItem(this.clientId)
    }

    set token(token) {
        if (token == null) {
            localStorage.removeItem(this.clientId)
        } else {
            localStorage.setItem(this.clientId, token)
        }

        // Force refresh
        window.location.reload()
    }

    /**
     * Begin web flow authorization
     */
    authorize(opts = {}) {
        window.location = 'https://github.com/login/oauth/authorize?' + new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: opts.redirect_uri || window.location,
            scope: opts.scope || 'read:org,public_repo',
            state: opts.state || Math.random().toString(36).substring(2),
            allow_signup: opts.allow_signup || false
        })
    }

    /**
     * Exchange temporary code for a token
     */
    async codeExchange() {
        const { code, state } = url.pull('code', 'state')

        const response = await fetch(`https://caf-fac.ca/gh.asp?code=${code}&state=${state}`)
        const data = await response.json()

        if (data.error) {
            console.error(data)
        } else {
            this.token = data.access_token
        }
    }

    /**
     * Get current user data
     * @returns {Promise<Object|null>}
     */
    async user() {
        const auth = await this.rest.auth()

        if (auth.type !== 'token') {
            return null
        }

        try {
            const user = await this.rest.users.getAuthenticated()
            this._user = user.data
            return this._user
        } catch (e) {
            return null
        }
    }

}

export const client = new GitHubOauthClient()


/**
 * Button element used for sign in and status
 * @type {Element|null}
 */
const button = document.getElementById('gh-signin')

// Add click event
if (button) {
    button.addEventListener('click', e => client.authorize())
} else {
    console.warn('Missing element #gh-signing')
}

// Check for user data
client.user().then(user => {
    if (user) {
        button.className = 'btn btn-success disabled'
        button.innerHTML = 'GitHub: ' + user.login
    }
})


// Move error data to console
if (url.has('error')) {
    console.error(url.pull('error', 'error_description', 'error_uri', 'state'))
}

// Perform code exchange
if (url.has('code', 'state')) {
    await client.codeExchange()
}


export default client