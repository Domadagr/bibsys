import React from "react";


const handleStatusClick = async (e) => {
    e.preventDefault();

    // Important: credentials: 'include' to send the cookie in the request
    const response = await fetch('http://localhost:3000/api/status', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },       
    });
    const data = await response.json();

}

const Home = () => {
    return (
        <div className="status-container">
            <button onClick={handleStatusClick}>Status</button>
        </div>
    )
        
};

export default Home