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

if (url.has('error')) {
    console.error(url.pull('error', 'error_description', 'error_uri'))
}


export const clientId = 'Iv1.5dceb0507b750647'

export function authorize() {
    window.location.replace('https://github.com/login/oauth/authorize?' + new URLSearchParams({
        client_id: clientId,
        redirect_uri: window.location,
        state: Math.random().toString(36).substring(2),
        allow_signup: false
    }))
}

export async function codeExchange() {
    const { code, state } = url.pull('code', 'state')

    if (!code || !state) {
        throw new Error('Missing url param for codeExchange')
    }

    const response = await fetch(`https://caf-fac.ca/gh/code-exchange.asp?code=${code}&state=${state}`)
    const data = await response.json()

    if (data.error) {
        throw new Error(data.error)
    } else {
        localStorage.setItem('gh-token', data.access_token)
    }
}

export function deauthorize() {
    localStorage.removeItem('gh-token')
    window.location.reload()
}

if (url.has('code', 'state')) {
    await codeExchange()
}

export const rest = new Octokit({
    auth: localStorage.getItem('gh-token')
})


const signin = document.getElementById('gh-signin')

if (localStorage.getItem('gh-token')) {
    try {
        const { data } = await rest.users.getAuthenticated()
        if (signin) {
            signin.className = 'text-success'
            signin.innerHTML = `${data.login} - Sign out`
            signin.addEventListener('click', function(e) {
                e.preventDefault()
                deauthorize()
            })
        }
    } catch (e) {
        deauthorize()
    }
} else if (signin) {
    signin.addEventListener('click', function(e) {
        e.preventDefault()
        authorize()
    })
}
