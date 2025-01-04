import { useNavigate } from "react-router-dom";
import './success.css';

export const Cancel = () => {
    const navigate = useNavigate();
    return (
        <div className="success-container">
            <h1 className="fail">Payment Failure.... Try again later</h1>
            <button className="success-button" onClick={() => navigate('/Home')}>
                Go Home
            </button>
        </div>
    );
};