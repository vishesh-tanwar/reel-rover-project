import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Imdbcard = ({ movie }) => {
    const Navigate = useNavigate() ; 
    const [addedToCart, setAddedToCart] = useState(false);

    const cardStyle = {
      width: '150px', // Fixed width for the card
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      textAlign: 'center',
      padding: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };
  
    const imgStyle = {
      width: '100%',
      height: '200px', // Fixed height for images
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0',
    };

    const handleClick = async() => {
        await axios.post('http://localhost:9000/user/addToWatchlist', 
        {name : movie.title, image : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,price : movie.price},{withCredentials:true}) 
          setAddedToCart(true) 
    } 
    // const handleClick = async() => {
    //       await axios.post('https://reels-rover-server.onrender.com/user/addToWatchlist', 
    //       {name : movie.title, image : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,price : movie.price},{withCredentials:true}) 
    //         setAddedToCart(true) 
    //   } 

    return (
      <div style={cardStyle} > 
        <img onClick={()=>{Navigate(`/movieDetail/${movie.id}`)}}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} banner`}
          style={imgStyle}
        />
        <h3 onClick={()=>{Navigate(`/movieDetail/${movie.id}`)}} style={{ fontSize: '14px', margin: '10px 0' }}>{movie.title}</h3>
        <h4 style={{ color: 'green', fontWeight: 'bold' }}>${movie.price}</h4>
        <h4 
          onClick={addedToCart ? null : handleClick} 
          style={{ cursor: "pointer" }}
        > 
          {addedToCart ? "Added to Cart" : "Add To Cart"}
        </h4>     
        
      </div>
    );
  };
  
  export default Imdbcard;
  