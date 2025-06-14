import { ArrowUpward, Facebook, LinkedIn, X } from '@mui/icons-material';
import React from 'react';
import './Footer.scss';
import { Link, NavLink } from 'react-router-dom';
const Footer = () => {
    const handleScroll = (e) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className='footer theme'>
            <hr />
            <div className='footer-bottom theme'>
                <p>&copy; MKOPO INUKA {new Date().getFullYear()}</p>
                <NavLink to={'/about#faq'} title='what people ask'>FAQ</NavLink>
                <button className="btn-top" onClick={() => handleScroll()}><ArrowUpward /></button>
            </div>

        </div>
    );
}

export default Footer;
