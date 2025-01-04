import { useNavigate } from "react-router-dom";
import './success.css';

export const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="success-container">
            <h1 className="success-message">Payment Successful</h1>
            <button className="success-button" onClick={() => navigate('/Home')}>
                Go Home
            </button>
        </div>
    );
};