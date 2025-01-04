import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const [data,setData] = useState({name:'',email:''}) ; 
    useEffect(()=>{
        const fetchData = async() => {
            const response = await axios.get(
                'http://localhost:9000/user/profile',
                // 'https://reels-rover-server.onrender.com/user/profile',
                {withCredentials:true}) ;
            setData(response.data) ; 
        }
        fetchData() ; 
    },[]) 
    return (
        <>
            <h1>User Profile</h1>
            <h3>Name</h3>
            <input value={data?.name} readOnly/>  
            <h3>Email</h3>
            <input value={data?.email} readOnly />
        </>
    )
}

export default Profile ;