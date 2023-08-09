import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import './Header.css';

function Header(){

    return(
        <div className='header'>
            <Navbar expand="lg" className='navbar'>
                <Container>
                    <Navbar.Brand href="/" className='nav_text'>AgentMaster</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;