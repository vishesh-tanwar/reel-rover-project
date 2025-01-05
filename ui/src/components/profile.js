import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:9000/user/profile",
        // "https://reels-rover-server.onrender.com/user/profile",
        { withCredentials: true }
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  const profileContainerStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  };

  const labelStyle = {
    display: "block",
    margin: "10px 0 7px",
    fontSize: "18px",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    marginLeft : "-9px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#333",
    textAlign: "center",
  };

  return (
    <div style={profileContainerStyle}>
      <h1 style={headingStyle}>User Profile</h1>
      <label style={labelStyle}>Name</label>
      <input style={inputStyle} value={data?.name} readOnly />
      <label style={labelStyle}>Email</label>
      <input style={inputStyle} value={data?.email} readOnly />
    </div>
  );
};

export default Profile;
