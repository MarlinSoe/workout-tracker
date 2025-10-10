import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('user');
        navigate('/login'); 
    };

    return (
        <div className='nav-bar-wrapper'>
            <div className='nav-bar-title-container'>
                <h1>Workout Tracker</h1>
            </div>
            <div className='nav-bar-logout-container'>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;
