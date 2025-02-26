import { React, useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

// Navbar container with a clean and modern style
const Container = styled.div`
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    border-bottom: 3px solid #007BFF;
`;

// Navbar text with improved readability and spacing
const Text = styled.span`
    color: white;
    font-size: 24px;
    font-style: italic;
    font-weight: bold;
    letter-spacing: 1.5px;
`;

// Form container with better alignment
const Form = styled.form`
    display: flex;
    align-items: center;
`;

// Matching input field with outlined design
const Input = styled.input`
    font-size: 18px;
    padding: 8px 12px;
    border: 2px solid #007BFF;
    border-radius: 8px;
    color: black;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: #0056b3;
        box-shadow: 0 0 8px rgba(0, 91, 187, 0.5);
    }

    &::placeholder {
        color: #007BFF;
    }
`;

// Matching outlined button
const OutlinedButton = styled.button`
    padding: 8px 16px;
    border: 2px solid #007BFF;
    border-radius: 8px;
    background-color: transparent;
    color: #007BFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px;

    &:hover {
        background-color: #007BFF;
        color: white;
        border-color: #0056b3;
    }

    &:active {
        background-color: #0056b3;
        border-color: #004085;
        color: white;
    }
`;

const Navbar = () => {

    const [name, setName] = useState(null)
    const navigate = useNavigate()

    
    return (
        <Container>
            <Text>Employee Management System</Text>
            <Form>
                <Input type="text" name="name" placeholder="Search employee" onChange={ (e) => {
                    setName(e.target.value)
                }}/>
                <OutlinedButton>Search</OutlinedButton>
            </Form>
        </Container>
    );
};

export default Navbar;
