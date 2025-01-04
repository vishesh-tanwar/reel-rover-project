import User from "../model/userModel.js";
import Stripe from 'stripe'
import dotenv from 'dotenv' 
import jwt from "jsonwebtoken"
dotenv.config() ;

const stripe = new Stripe(process.env.SECRET_KEY) 

export const register = async(req,res) => {
    const data = req.body ; 
    const userData = await User.create(data) ;
    return res.status(200).send(data) ; 
}

export const userLogin = async (req, res) => {
    const data = req.body;
    try {
        // Find the user by email
        const userData = await User.findOne({ email: data.email });

        if (!userData) {
            return res.status(400).send('Wrong credentials');
        }

        if (userData.password !== data.password) {
            return res.status(400).send('Wrong credentials');
        }

        const token = userData.generateJWTToken();
        // res.cookie('token', token, { httpOnly: true });
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false, // Use 'false' for localhost (set 'true' for HTTPS in production)
            sameSite: "",
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
          });
        if (token){
            return res.status(200).send('Login successful');
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal Server Error');
    }
};

export const profile = async(req,res) => {
    const userID = req.user.id ;  
    const data = await User.findById(userID) ;  
    res.status(200).send(data) ;
}

export const status = (req, res) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        console.error("No token found in cookies");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD); // Verify token
        console.log("Decoded token:", decoded); // Debugging
        return res.status(200).json({ id: decoded.id });
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};



export const logout = (req,res) => {
    res.clearCookie('token', { 
        httpOnly: true,  // Ensures the cookie cannot be accessed via JavaScript
        path: '/',       // Make sure to clear the cookie from the right path
      });
    
      res.status(200).json({ message: 'Logged out successfully' });
}

export const addToWatchlist = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { name, image, price } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { // Avoid duplicate entries
                    watchlist: { name, image, price },
                },
            },
            { new: true } 
        );

        if (updatedUser) {
            return res.status(200).json({
                message: "Movie added to watchlist",
                watchlist: updatedUser.watchlist,
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding to watchlist:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const watchlist = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the authenticated request
        // Fetch user by ID and populate the watchlist
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the watchlist as the response
        res.status(200).json({
            message: "Watchlist fetched successfully",
            watchlist: user.watchlist,
        });
    } catch (e) {
        res.status(500).send("Error fetching watchlist");
        console.log(e);
    }
}; 

export const deleteFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.params; 
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {
                $pull: { // Use $pull to remove the specific movie
                    watchlist: { _id: movieId },
                },
            },
            { new: true } 
        );

        if (updatedUser) {
            res.status(200).json({
                message: "Movie removed from watchlist" 
            });
        } else {
            res.status(404).json({ message: "User or movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const makePayment = async(req,res) => {
    try {
        const {products} = req.body ; 
        const lineItems = products.map(product=>({
            price_data : {
                currency : 'usd',
                product_data : {
                    name : product.name,
                    images : [product.image]
                },
                unit_amount : Math.round(product.price * 100) ,
            },
            quantity : 1
        })) 

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : lineItems ,
            mode : 'payment',
            success_url : "http://localhost:3000/success",
            cancel_url : "http://localhost:3000/cancel"
        })

        res.status(200).json({id : session.id}) ; 
    }  catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}