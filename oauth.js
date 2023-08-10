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


export const user = {
    get token() {
        return localStorage.getItem('gh-token')
    },

    set token(token) {
        if (token == null) {
            localStorage.removeItem('gh-token')
        } else {
            localStorage.setItem('gh-token', token)
        }
    },

    login: null
}

export const rest = new Octokit({ auth: user.token })

export function authorize() {
    user.token = null
    window.location.replace('https://github.com/login/oauth/authorize?' + new URLSearchParams({
        client_id: clientId,
        redirect_uri: window.location,
        state: Math.random().toString(36).substring(2),
        allow_signup: false
    }))
}

export function deauthorize() {
    user.token = null
    window.location.reload()
}

export async function codeExchange(code, state) {
    const response = await fetch(`https://caf-fac.ca/gh/code-exchange.asp?code=${code}&state=${state}`)
    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data.access_token
    }
}

if (url.has('code', 'state')) {
    const { code, state } = url.pull('code', 'state')
    user.token = await codeExchange(code, state)
    window.location.reload()
}

if (url.has('error')) {
    console.error(url.pull('error', 'error_description', 'error_uri'))
}

if (user.token) {
    try {
        const { data } = await rest.users.getAuthenticated()
        user.login = data.login
    } catch (e) {
        user.token = null
        window.location.reload()
    }
}

const signin = document.getElementById('gh-signin')

if (signin) {
    if (user.login) {
        signin.className = 'text-success'
        signin.innerHTML = `${user.login} - Sign out`
        signin.addEventListener('click', function(e) {
            e.preventDefault()
            deauthorize()
        })
    } else {
        signin.addEventListener('click', function(e) {
            e.preventDefault()
            authorize()
        })
    }
}
