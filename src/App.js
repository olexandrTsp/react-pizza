import './scss/app.scss'

import Header from './Components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { Routes, Route } from "react-router-dom";


// https://62e694a269bd03090f72e797.mockapi.io/items

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;

