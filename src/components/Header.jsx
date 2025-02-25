import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import packageJson from '../../package.json';
import ThemeToggle from './ThemeToggle';

import { MarkGithubIcon } from '@primer/octicons-react';

const repo_url = packageJson.repository.url.replace('.git', '');

function Header() {
    return (
        <Navbar className="border-bottom">
            <Container>
                <Navbar.Brand href="https://github.com/dnd-mdn">dnd-mdn</Navbar.Brand>
                <Nav>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>View project on GitHub</Tooltip>}>
                        <Nav.Link href={repo_url} target="_blank">
                            <MarkGithubIcon size={22} />
                        </Nav.Link>
                    </OverlayTrigger>
                    <ThemeToggle size={22} />
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;