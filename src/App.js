import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LoginGithub from 'react-login-github';

const onSuccess = response => console.log(response);
const onFailure = error => console.error(error);

function App() {
  return (
    <div className="App">

      <Navbar className="border-bottom">
        <Container>
          <Navbar.Brand href="https://github.com/dnd-mdn">dnd-mdn</Navbar.Brand>
          <Nav>
            <Navbar.Text>
              <LoginGithub
                className="btn btn-link p-0"
                clientId="Iv1.5dceb0507b750647"
                redirectUri="https://dnd-mdn.github.io/oauth/pop.html"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h1 class="h2">GitHub oauth test</h1>
      </Container>
    </div>

  );
}

export default App;
