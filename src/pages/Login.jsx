import useAxios from 'axios-hooks';
import { Container } from 'react-bootstrap';

const initial_params = new URLSearchParams(window.location.search);

/**
 * Login page
 */
const Login = () => {
    return (
        <Container fluid={true} className="my-3">
            {initial_params.has('code') && initial_params.has('state') ? <Exchange /> : <Redirect />}
        </Container>
    );
}

/**
 * Redirect to get temporary code and redirect back
 */
const Redirect = () => {
    const params = new URLSearchParams({
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        state: Math.random().toString(36).substring(2),
        allow_signup: false,
        redirect_uri: `${window.location.origin}/oauth/login`,
    });

    window.location.assign(`https://github.com/login/oauth/authorize?${params}`);

    return <h1>Redirecting to GitHub...</h1>;
}

/**
 * Exchange temporary code for an access token
 */
const Exchange = () => {
    const base_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_GITHUB_AUTH_API : '/proxy';
    const [{ data, loading, error }] = useAxios(`${base_url}/create.php?${initial_params}`);

    if (loading) {
        return <h1>Logging in...</h1>;
    }

    if (error || data.error) {
        return (
            <>
                <h1>Something went wrong</h1>
                <p>{error || data.error}</p>
            </>
        );
    }

    localStorage.setItem(process.env.REACT_APP_GITHUB_AUTH_KEY, JSON.stringify(data));
    window.close();

    return <h1>Logged in successfully</h1>;
}

export default Login;