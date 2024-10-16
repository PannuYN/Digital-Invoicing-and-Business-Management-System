import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLayout from './Layout';
import Home from './Home';
import T from './T';
import MainComponent from './MainComponent';
import Products from './Products';
import Clients from './Clients';
import Invoices from './Invoices';
import MyComponent from './T';
import GenerateInvoice from './GenerateInvoice';
import WalletApp from './WalletApp';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Sales from './Sales';
import { useEffect, useState } from 'react';


function App() {

  const [role, setRole] = useState();
  useEffect(() => {
    const fetchRole = localStorage.getItem('authenticated');
    setRole(fetchRole);
  }, []);


  return (
    <div className="App">
      {
        role === null ? (
          <BrowserRouter>
          <Routes>
            <Route path="/layout" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Login />} />
            <Route path="/invoices" element={<Login />} />
            <Route path="/clients" element={<Login />} />
            <Route path="/generate" element={<Login />} />
            <Route path="/test" element={<Login />} />
            <Route path="/wallet/:amount/:id" element={<WalletApp />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Login />}></Route>
            <Route path='/profile' element={<Login />}></Route>
            <Route path='/sales' element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
        ):(
          <BrowserRouter>
            <Routes>
              <Route path="/layout" element={<MyLayout />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/generate" element={<GenerateInvoice />} />
              <Route path="/test" element={<MyComponent />} />
              <Route path="/wallet/:amount/:id" element={<WalletApp />} />
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/sales' element={<Sales />}></Route>
            </Routes>
          </BrowserRouter>
        )}
          
    </div>
  );
}

export default App;
