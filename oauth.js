/**
 * Perform OAuth authentication through web application flow
 * @see https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
 */

import { Octokit } from 'https://cdn.jsdelivr.net/npm/@octokit/rest@20.0.2/+esm'

const clientId = 'Iv1.5dceb0507b750647'

function hasParam(...args) {
    const params = new URLSearchParams(window.location.search)
    for (let i = 0; i < args.length; i++) {
        if (!params.has(args[i])) {
            return false
        }
    }
    return true
}

function pullParam(...args) {
    const params = new URLSearchParams(window.location.search)
    let obj = {}
    for (let i = 0; i < args.length; i++) {
        obj[args[i]] = params.get(args[i])
        params.delete(args[i])
    }
    history.replaceState(null, '', '?' + params)
    return obj
}

async function request(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) { throw new Error(data.error); }
    return data;
}

export function authorize() {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: window.location,
        state: Math.random().toString(36).substring(2),
        allow_signup: false
    });
    window.location.replace(`https://github.com/login/oauth/authorize?${params}`);
}

export async function codeExchange() {
    const { code, state } = pullParam('code', 'state');
    if (!code || !state) { throw new Error('URL parameters "code" and "state" required'); }
    const data = await request(`https://caf-fac.ca/gh/create.asp?code=${code}&state=${state}`);
    localStorage.setItem('gh-token', data.access_token);
}

export async function user() {
    const token = localStorage.getItem('gh-token');
    if (!token) { throw new Error('No stored token'); }
    return await request(`https://caf-fac.ca/gh/check.asp?token=${token}`);
}

export async function deauthorize() {
    const token = localStorage.getItem('gh-token');
    if (!token) { throw new Error('No stored token'); }
    await request(`https://caf-fac.ca/gh/delete.asp?token=${token}`);
    localStorage.removeItem('gh-token');
    window.location.reload();
}




export let rest = new Octokit({
    auth: localStorage.getItem('gh-token')
})



export async function init() {
    if (hasParam('error')) {
        console.error(url.pull('error', 'error_description', 'error_uri'))
    }

    if (hasParam('code', 'state')) {
        await createToken()
    }

    const signin = document.getElementById('gh-signin')


    try {
        const user = await checkToken()
        console.log(data)
        if (signin) {
            signin.className = 'text-success'
            signin.innerHTML = `${data.login} - Sign out`
            signin.addEventListener('click', function (e) {
                e.preventDefault()
                deauthorize()
            })
        }
    } catch (e) {
        localStorage.removeItem('gh-token')
    }



}


