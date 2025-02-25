import useAxios from 'axios-hooks';
import { Container } from 'react-bootstrap';

const initial_auth = localStorage.getItem(process.env.REACT_APP_GITHUB_AUTH_KEY);

/**
 * Logout page
 */
const Logout = () => {
    return (
        <Container fluid={true} className="my-3">
            {initial_auth ? <RevokeAuth /> : <NoAuth />}
        </Container>
    );
}

/**
 * If attempting to logout without being logged in
 */
const NoAuth = () => {
    return (
        <>
            <h1>Something went wrong</h1>
            <p>You are not logged in</p>
        </>
    );
}

/**
 * Revoke the current token and remove it
 */
const RevokeAuth = () => {
    const base_url = process.env.NODE_ENV === "production" ? process.env.REACT_APP_GITHUB_AUTH_API : '/proxy';
    const [{ data, loading, error }] = useAxios(`${base_url}/delete.php?token=${initial_auth?.access_token}`);

    if (loading) {
        return <h1>Logging out...</h1>;
    }

    if (error || data.error) {
        return (
            <>
                <h1>Something went wrong</h1>
                <p>{error || data.error}</p>
            </>
        );
    }

    localStorage.removeItem(process.env.REACT_APP_GITHUB_AUTH_KEY);
    window.close();

    return <h1>Logged out successfully</h1>;
}

export default Logout;