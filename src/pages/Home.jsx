import useLocalStorageState from 'use-local-storage-state';

import Container from 'react-bootstrap/Container';

import Header from '../components/Header';

const User = () => {
    const [auth] = useLocalStorageState(process.env.REACT_APP_GITHUB_AUTH_KEY);

    return (
        <div>
            <h2>You are signed in!</h2>
            <p>User: <a href={auth?.details.user.html_url} target="_blank">{auth?.details.user.login}</a></p>
        </div>
    )
}

const Home = () => {
    const [auth] = useLocalStorageState(process.env.REACT_APP_GITHUB_AUTH_KEY);

    const login = () => {
        window.open(`/oauth/login.html`, 'Sign in with GitHub', 'width=500,height=500');
    }

    const logout = () => {
        window.open(`/oauth/logout.html`, 'Sign in with GitHub', 'width=500,height=500');
    }

    return (
        <>
            <Header />
            <Container>
                <h1 className="h2 mt-4">Log in with GitHub</h1>
                <p className="lead">Use your GitHub account</p>

                {auth && <User />}

                {!auth && <button className="btn btn-primary" onClick={login}>Log in</button>}
                {auth && <button className="btn btn-primary" onClick={logout}>Log out</button>}
                
            </Container>
        </>
    );
}

export default Home;