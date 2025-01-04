import axios from "axios";
import { useEffect, useState } from "react";
import "./watchlist.css";
import { loadStripe } from "@stripe/stripe-js";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    console.log("Environment Variables: ", process.env);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/user/watchlist",
          // "https://reels-rover-server.onrender.com/user/watchlist",
          { withCredentials: true }
        );
        if (response.data) {
          const fetchedWatchlist = response.data.watchlist;
          setWatchlist(fetchedWatchlist);

          const totalAmount = fetchedWatchlist.reduce(
            (sum, movie) => sum + parseFloat(movie.price),
            0
          );
          setAmount(totalAmount);
        } else {
          console.log("Error fetching watchlist");
        }
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run only on mount

  const handleDelete = async (movieId) => {
    console.log(`before delete ${watchlist}`);

    try {
      await axios.delete(
        `http://localhost:9000/user/deleteFromCart/${movieId}`,
        // `https://reels-rover-server.onrender.com/user/deleteFromCart/${movieId}`,
        { withCredentials: true }
      );
      const updatedWatchlist = watchlist.filter(
        (movie) => movie._id !== movieId
      );
      setWatchlist(updatedWatchlist);

      const totalAmount = updatedWatchlist.reduce(
        (sum, movie) => sum + parseFloat(movie.price),
        0
      );
      setAmount(totalAmount);
      console.log(`after delete ${watchlist}`);
    } catch (error) {
      console.log("Error deleting movie:", error.message);
    }
  };

  const makePayment = async () => {
    // const key = process.env.REACT_APP_PUBLIC_KEY;    
    // const stripe = await loadStripe(key);
    const stripe = await loadStripe("pk_test_51QRuQtLOOU4Z0D1Ig4Ro9mT2pnvKppVIlnmofZySxkTUA9aOdHupKN3EqFxgMMovGi0k0qso8cKX4mOqzD96WXRY00wGJdB1VV")

    const body = {
      products: watchlist,
    };
    try {
      const response = await axios.post(
        "http://localhost:9000/user/makepayment/create-checkout-session",
        // "https://reels-rover-server.onrender.com/user/makepayment/create-checkout-session",
        body,
        { withCredentials: true }
      );
      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      }
    } catch (e) {
      console.error("payment error : ", e.message);
    }
  };

  return (
    <>
      <div className="watchlist-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie, index) => (
            <div key={index} className="movie-card">
              <div>
                <img
                  className="movie-image"
                  src={movie.image}
                  alt={movie.name}
                />
              </div>
              <div className="movie-name">{movie.name}</div>
              <div style={{ color: "green" }} className="movie-price">
                ${movie.price}
              </div>
              <div
                className="remove-button"
                onClick={() => handleDelete(movie._id)} // Pass movie._id on click
              >
                Remove From Watchlist
              </div>
            </div>
          ))
        ) : (
          <div className="no-watchlist">No movies in your watchlist</div>
        )}
      </div>
      <div>Total Amount : {amount.toFixed(2)}</div>{" "}
      {/* Displaying the total amount with 2 decimal places */}
      <div
        style={{
          cursor: "pointer",
          margin: "20px",
          border: "2px solid black",
          width: "70px",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          background: "beige",
        }}
        onClick={makePayment}
      >
        PAY
      </div>
    </>
  );
};

export default Watchlist;
