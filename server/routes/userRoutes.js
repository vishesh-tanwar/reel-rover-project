import express from 'express'
import { addToWatchlist, deleteFromWatchlist, logout, makePayment, profile, register, status, userLogin, watchlist } from '../controller/userController.js';
import Auth from '../middleware/authentication.js';

const router = express.Router() 
router.post('/signUp',register);
router.post('/login',userLogin);
router.post('/addToWatchlist',Auth,addToWatchlist);
router.delete('/deleteFromCart/:movieId',Auth,deleteFromWatchlist) ; 
router.get('/watchlist',Auth,watchlist) ;   
router.get('/profile',Auth,profile) ;
router.get('/status',Auth,status) ; 
router.post('/logout',logout) ;  
router.post('/makepayment/create-checkout-session',makePayment) ; 

export default router ;  