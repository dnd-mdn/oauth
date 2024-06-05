import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { useContext } from 'react';
import UserContext from './User';


function App() {
  const user = useContext(UserContext);

  return (
    <div className="App">

      <Navbar className="border-bottom">
        <Container>
          <Navbar.Brand href="https://github.com/dnd-mdn">dnd-mdn</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <h1 class="h2">GitHub oauth test</h1>
        <p>{user.name}</p>
      </Container>
    </div>

  );
}

export default App;
