import Image from "../movieHome.png";
import "./welcome.css";

export default function Welcome() {
  return (
    <>
      <div className="background-container">
        <img src={Image} alt="Cover Image" className="background-image" />
        <div className="text-container">
          <h1>REEL ROVER</h1>
          <p>
            Welcome to Reel Rover, your ultimate destination for exploring and
            purchasing movies online! Dive into a world of cinema with a sleek,
            user-friendly platform that brings thousands of movies right to your
            fingertips. Explore Thousands of Movies: From timeless classics to
            the latest blockbusters, find a movie for every mood and genre.
            Secure Payment Gateway: Powered by Stripe, Reel Rover ensures
            seamless and secure transactions for an effortless shopping
            experience. Dynamic Browsing Experience: Discover movies in a
            visually captivating interface with real-time updates and intuitive
            navigation. Optimized for All Devices: Enjoy the same cinematic
            browsing experience on desktops, tablets, and smartphones. Whether
            you're a film enthusiast or a casual moviegoer, Reel Rover is
            designed to make your movie exploration simple, secure, and
            enjoyable. Start your journey into the cinematic universe today!
          </p>
        </div>
      </div>
    </>
  );
}
