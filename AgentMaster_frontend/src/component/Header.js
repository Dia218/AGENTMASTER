import Navbar from 'react-bootstrap/Navbar';
import { Button, Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { HomeFilled } from '@ant-design/icons';

function Header(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`);
    }
    const onClickNews = () => {
        navigate(`/`);
    }
    const onClickChart = () => {
        navigate(`/chartMain`);
    }

    return(
        <div className='header'>
            <Navbar expand="lg" className='navbar'>
                <Container>
                    <Navbar.Brand onClick={handleClick} className='nav_text'>AgentMaster</Navbar.Brand>
                    <Stack direction="horizontal" gap={3}>
                        <Button variant='light' onClick={onClickNews}><div className='nav_newsButton'><HomeFilled className='newsButton'/> 뉴스</div></Button>
                        <Button variant='light' onClick={onClickChart}><div className='nav_chartButton'><HomeFilled className='chartButton'/> 증시</div></Button>
                    </Stack>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;