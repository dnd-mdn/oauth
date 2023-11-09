/**
 * Perform OAuth authentication through web application flow
 * @see https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
 */


import { Octokit } from 'https://cdn.jsdelivr.net/npm/@octokit/rest@20.0.1/+esm'


const url = {
    has: (...args) => {
        const params = new URLSearchParams(window.location.search)
        for (let i = 0; i < args.length; i++) {
            if (!params.has(args[i])) {
                return false
            }
        }
        return true
    },
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



export const clientId = 'Iv1.5dceb0507b750647'

/**
 * Get current authentication
 * @returns {Object}
 */
export async function auth() {
    const token = localStorage.getItem('gh-token')

    if (!token) {
        throw new Error('No stored token')
    }

    const response = await fetch(`https://caf-fac.ca/gh/check.asp?token=${token}`)
    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    }
    
    return data
} 

/**
 * Initiate the process of requesting a users GitHub identity
 * @see https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
 */
export function authorize() {
    window.location.replace('https://github.com/login/oauth/authorize?' + new URLSearchParams({
        client_id: clientId,
        redirect_uri: window.location,
        state: Math.random().toString(36).substring(2),
        allow_signup: false
    }))
}

/**
 * Exchange the temporary code for a token
 */
export async function codeExchange() {
    const { code, state } = url.pull('code', 'state')

    if (!code || !state) {
        throw new Error('URL parameters "code" and "state" required')
    }

    const response = await fetch(`https://caf-fac.ca/gh/create.asp?code=${code}&state=${state}`)
    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    }

    localStorage.setItem('gh-token', data.access_token)
}

/**
 * Invalidate the current authentication token
 */
export async function deauthorize() {
    const token = localStorage.getItem('gh-token')

    if (!token) {
        throw new Error('No stored token')
    }

    const response = await fetch(`https://caf-fac.ca/gh/delete.asp?token=${token}`)
    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    }
    
    localStorage.removeItem('gh-token')
    window.location.reload()
}



export const rest = new Octokit({
    auth: localStorage.getItem('gh-token')
})



export async function init() {
    if (url.has('error')) {
        console.error(url.pull('error', 'error_description', 'error_uri'))
    }
    
    if (url.has('code', 'state')) {
        await codeExchange()
    }

    const signin = document.getElementById('gh-signin')

    if (localStorage.getItem('gh-token')) {
        try {
            const { data } = await rest.users.getAuthenticated()
            if (signin) {
                signin.className = 'text-success'
                signin.innerHTML = `${data.login} - Sign out`
                signin.addEventListener('click', function (e) {
                    e.preventDefault()
                    deauthorize()
                })
            }
        } catch (e) {
            deauthorize()
        }
    } else if (signin) {
        signin.addEventListener('click', function (e) {
            e.preventDefault()
            authorize()
        })
    }
}



