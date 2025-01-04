import { useState } from "react";
import axios from "axios";
import "./signup.css"; 

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePass = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:9000/user/signUp",
                // "https://reels-rover-server.onrender.com/user/signUp", 
                {
                name,
                email,
                password,
            });
            if (response.status === 201) {
                setMessage("Registration successful! 🎉");
            }
        } catch (e) {
            console.error(e);
            setMessage("Internal server error. Please try again later.");
        }
    };

    return (
        <div className="box">
            <h1>Signup Here</h1>
            <h3>Name</h3>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                placeholder="Enter your name"
            />
            <h3>Email</h3>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter your email"
            />
            <h3>Password</h3>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePass}
                placeholder="Enter your password"
            />
            <button onClick={handleSubmit}>Signup</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
