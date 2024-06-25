import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";
import './style.css';
import logoImage from '../../assets/logo.svg'
import api from '../../services/api';


export default function Books(){
    const [books, setBooks] = useState([]);

    const history = useHistory();

    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');

    const authorization = {
        headers: {
            Authorization: `Bearer ${{accessToken}}`
        }
    };

    useEffect(() => {
        api.get('api/book/v1?page=0&limit=4&direction=asc', authorization).then(response => {
            setBooks(response.data._embedded.bookVOList);
        });
    }, [accessToken])

    async function deleteBook(id){
        try {
            await api.delete(`api/book/v1/${id}`, authorization);
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            alert('Delete Failed!')
        }
    }

    async function logout(id){
        try {
            localStorage.clear();
            history.push('/');
        } catch (error) {
            alert('Logout Failed!')
        }
    }

    return (
     <div className="book-container">
        <header>
            <img src={logoImage} alt="LogoImage"/>
            <span>Welcome, <strong>{username.toUppCase()}</strong>!</span>
            <Link className="button" to="book/new/0">Add new Book</Link>
            <button onClick={logout} type="button">
                <FiPower size={18} color="#251fc5"></FiPower>
            </button>
        </header>

        <h1>Registered Books</h1>
        <ul>
            
               {books.map(book =>(
                <li key={book.id}>
                    <strong>Title</strong>
                    <p>{book.title}</p>
                    
                    <strong>Author:</strong>
                    <p>{book.author}</p>
                    <strong>Price:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                    <strong>Release Date:</strong>
                    <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
                    
                    <button type="button">
                    <FiEdit size={20} color="#251fc5"/>
                </button>   

                <button type="button" onClick={() => deleteBook(book.id)}>
                    <FiTrash2 size={20} color="#251fc5"/>
                </button> 
                    </li>                 
                ))}  
        </ul>
     </div>   
    );
}