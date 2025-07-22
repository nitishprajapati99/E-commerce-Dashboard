import React from 'react';
import Nav from './component/Nav';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/footer';
import Signup from './component/SignUp';
import PrivateComponent from "./component/private";
import Login from "./component/Login";
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';

import { SnackbarProvider } from "./Context/SnackbarContext";
import Forgotpwd from './component/ForgotPwd';
import Resetpwd from './component/Resetpwd';


function App() {

  return (

    <div style={{ padding: '2rem', fontSize: '24px', color: 'black' }}>
      <BrowserRouter>
      <SnackbarProvider>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/add" element={<AddProduct />}></Route>
            <Route path="/update/:id" element={<UpdateProduct />}></Route>
            <Route path="/logout"  ></Route>
            <Route path="/profile" element={<h1>Profile component</h1>}></Route>
          </Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='/forgotpwd' element={<Forgotpwd />}></Route>
          <Route path='/reset' element={<Resetpwd />}></Route>
        </Routes>
        </SnackbarProvider>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;

