import { useState } from "react";
import React from 'react';
import Navbar from "./Components/Navbar";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp()
{

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (fieldName) => (event) =>
  {
    setValues({ ...values, [fieldName]: event.target.value })
  }

  const handleSubmit = async (event) =>
  {
    event.preventDefault()

    const user = {
      "username": values.username,
      "password": values.password,
    }

    try
    {
      const res = await axios.post(
        'http://localhost:5000/users/add',
        user
      );

      console.log(res.data);

      // Log user in
      const loginRes = await axios.post(
        'http://localhost:5000/users/signin',
        user
      );

      console.log("Succesfuly logged in with userID " + loginRes.data)
      sessionStorage.setItem('userID', loginRes.data);
      navigate('/main');
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Navbar />

      {/*  Page content */}
      <main className="grow font-inter antialiased text-gray-200 tracking-tight">



        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form className="signup" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="fullname">Full Name <span className="text-red-600">*</span></label>
                      <input id="fullname" type="text" className="form-input w-full text-gray-300" placeholder="First name and Last Name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email<span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="text">Username <span className="text-red-600">*</span></label>
                      <input id="username" type="text" value={values.username} onChange={handleChange('username')} className="form-input w-full text-gray-300" placeholder="Username" required />
                    </div>

                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" value={values.password} onChange={handleChange('password')} className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Already using Score? <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>

    </div>
  );
}

export default SignUp;