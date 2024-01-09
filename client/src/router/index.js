import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from '../Pages/Signup/SingUp'
import Home from '../Pages/Home/Home'

function index() {
    return (


        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </BrowserRouter >

    )
}

export default index