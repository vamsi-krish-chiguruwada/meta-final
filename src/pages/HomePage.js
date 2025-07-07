import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to Little Lemon</h1>
            <p>The best restaurant in town.</p>
            <Link to="/booking" className="cta-button">Reserve a Table</Link>
        </div>
    );
};

export default HomePage;