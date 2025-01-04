import {BrowserRouter , Route , Routes} from 'react-router-dom' 
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Watchlist from './components/watchlist';
import MovieDetail from './components/movieDetail';
import Profile from './components/profile';
import Navbar from './components/navbar';
import Welcome from './components/welcome';
import { Success } from './components/success';
import { Cancel } from './components/cancel';

const App = () => {
  return (
  <BrowserRouter>
    <Navbar/> 
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/watchlist' element={<Watchlist/>}/>
      <Route path='/movieDetail/:movieId' element={<MovieDetail/>}/> 
      <Route path='/profile' element={<Profile/>}/> 
      <Route path='/success' element={<Success/>}/> 
      <Route path='/cancel' element={<Cancel/>}/> 

    </Routes>
  </BrowserRouter>

  )
}
export default App ; 