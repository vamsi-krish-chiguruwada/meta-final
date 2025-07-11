import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Little Lemon</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/booking">Reserve Table</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;