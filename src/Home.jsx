import React, { useState } from "react";


function status() {
    const [ status ] = useState([]);

    const getStatus = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/status', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },       
            });
            console.log(response);
        } catch (err) {
            setError(err.message);
        } 
    }
}

const handleStatusClick = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/status', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },       
    });
    console.log(response);
}

const Home = () => {
    return (
        <div className="status-container">
            <button onClick={handleStatusClick}>Status</button>
        </div>
    )
        
};

export default Home