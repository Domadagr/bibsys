import React, { useState, useEffect } from 'react';

function Booklist() {
    // State variables, react hooks.
    // books holds current value of the state, the []
    // setBooks updates the state.
    // loading is the loading status, true means data is being fetched,
    // false means data has been fetched.
    const [books, setBooks] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const getBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/booklist', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },       
            });

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }     
    };
    useEffect(() => {
        getBooks();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='list-of-books'>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <div className='book-fields'>
                            <span className='book-title'>Title:</span> {book.title}
                        </div>
                        <div className='book-fields'>
                            <span className='book-author'>Author:</span> {book.author}
                        </div>
                        <div className='book-fields'>
                            <span className='book-year'>Year:</span> {book.year}                           
                        </div>
                        <div className='book-fields'>
                            <span className='book-genre'>Genre:</span> {book.genre}
                        </div>
                
                        <br></br>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Booklist