import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from "react-icons/fi";
import logoImage from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewBook() {
    const [author, setAuthor] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');

    const history = useHistory();

    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${{accessToken}}`
        }
    };

    async function createNewBook(e) {
        e.preventDefault();

        const data = {
            author, launchDate,price, title
        };

        try {
            await api.post('api/book/v1', data, authorization);
            history.push('/books');
        } catch (error) {
            alert('Failed! Try again!');
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                        <img src={logoImage} alt="Logo Image"/>
                        <h1>Add New Book</h1>
                        <p>Enter the book information and click on 'Add'</p>
                        <Link className="back-link" to="/books">
                            <FiArrowLeft size={16} color="#251fc5"/>Home
                        </Link>
                        </section>
                    <form onSubmit={createNewBook}>
                        <input placeholder="Title"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                        />
                        <input placeholder="Author"
                        value={author}
                        onChange={e=> setAuthor(e.target.value)}
                        />
                        <input placeholder="Date"
                        value={launchDate}
                        onChange={e=> setLaunchDate(e.target.value)}
                        />
                        
                        <input placeholder="Price"
                        value={price}
                        onChange={e=> setPrice(e.target.value)}
                        />

                        <button className="button" type="submit">Add</button>
                    </form>
            </div>
        </div>
    );
}