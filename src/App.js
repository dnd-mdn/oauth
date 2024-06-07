import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading, isAuthenticated, error, user, getAccessTokenWithPopup, logout } = useAuth0();

  let button = null
  if (isAuthenticated) {
    button = (
      <div>
        Hello {user.name}{' '}
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log out
        </button>
      </div>
    );
  } else {
    button = <button onClick={() => getAccessTokenWithPopup()}>Log in</button>;
  }

  return (
    <div className="App">

      <Navbar className="border-bottom">
        <Container>
          <Navbar.Brand href="https://github.com/dnd-mdn">dnd-mdn</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <h1 class="h2">GitHub oauth test</h1>
        <p>{button}</p>
      </Container>
    </div>

  );
}

export default App;
