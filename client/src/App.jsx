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
import Sucess from './components/paypal/Sucess';
import Failure from './components/paypal/Failure';
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
      <Route exact path='/success' element = {<Sucess/>} />
      <Route exact path='/failure' element = {<Failure/>} />
    </Routes>
    </>
  )
}

export default App
