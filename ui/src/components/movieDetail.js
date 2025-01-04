import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
    const [moviedetail,setmoviedetail] = useState({});
    const params = useParams();
    console.log(params); 

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=9f48a5b363c49e0c31bf3d09bb319827`)
        .then(res => res.json())
        .then(data => setmoviedetail(data)) ; 
    },[])    
    return (
        <>
        <h1>Movie Detail</h1>
        <h2>{moviedetail.title}</h2> 
        <img src={`https://image.tmdb.org/t/p/w500${moviedetail.backdrop_path}`} alt=""/>
        <p>{moviedetail.overview}</p>

        </>
    )
} 
export default MovieDetail ;