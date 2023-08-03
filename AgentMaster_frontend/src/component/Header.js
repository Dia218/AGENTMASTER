import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`);
    }

    return(
        <div className='header'>
            <Navbar expand="lg" className='navbar'>
                <Container>
                    <Navbar.Brand onClick={handleClick} className='nav_text'>AgentMaster</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;