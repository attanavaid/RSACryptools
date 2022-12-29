import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Landing from './components/Landing';
import RSA from './components/RSA';
import Factorization from './components/Factorization';
import Footer from './components/Footer';

import './styles.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="rsa" element={<RSA/>}/>
          <Route path="factorization" element={<Factorization/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;