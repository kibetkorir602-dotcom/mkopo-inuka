import Logo from '../../assets/logo.png';
import './Navbar.scss';

import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <header>
            <NavLink to="/" className='logo'>
                <img src={Logo} alt='mkopo_inuka_logo' />
            </NavLink>
            <nav>
                <NavLink to="/" title='home'>Home</NavLink>
                <NavLink to="/about" title='contact'>About</NavLink>
                {
                    location.pathname !== "/apply" && (
                        <div className="btn-wrapper">
                            <NavLink className="btn" to="/apply" title='contribute'>APPLY</NavLink>
                        </div>
                    )
                }
            </nav>

        </header>
    );
}

export default Navbar;