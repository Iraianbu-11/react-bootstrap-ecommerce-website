import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {Route, Routes} from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/paypal/Success';
import Failure from './components/paypal/Failure';
import Admin from './components/Admin';
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/products' element = {<Products/>}/>
      <Route exact path='/product/:id' element = {<Product/>} />
      <Route exact path='/about' element = {<About/>} />
      <Route exact path='/contact' element = {<Contact/>} />
      <Route exact path='/cart' element = {<Cart/>} />
      <Route exact path='/checkout' element = {<Checkout/>} />
      <Route exact path='/success' element = {<Success/>} />
      <Route exact path='/failure' element = {<Failure/>} />
      <Route exact path='/admin' element = {<Admin/>} />
    </Routes>
    </>
  )
}

export default App
