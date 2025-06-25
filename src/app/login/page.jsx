"use client"
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { userData } from '../slice/userSlice';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../config/firebaseConfig';

export default function login() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    let dispatch = useDispatch()
    let dashBoard = () => {
        window.location.href = '/my-dashboard'
    }
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let userRegister = (e) => {
        let formValue = new FormData(e.target)
        axios.post(`${apiBaseUrl}user/regsiter`, formValue)
            .then((res) => {
                console.log(res.data)
            })
        e.preventDefault()
    }

    let googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                let insertObj={
                    displayName:user.displayName,
                    email:user.email,
                    phoneNumber:user.user
                }
                axios.post(`${apiBaseUrl}user/create-user-google-login`, insertObj)
                .then((res) => {
                    if (res.data.status) {
                        dispatch(userData({ user: res.data.user, token: res.data.token }))
                        redirect('/my-dashboard') //Next Js
                    }
                })

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    let login = (e) => {
        let formValue = new FormData(e.target)
        axios.post(`${apiBaseUrl}user/login`, formValue)
            .then((res) => {
                if (res.data.status) {
                    console.log(res.data.token)
                    dispatch(userData({ user: res.data.user, token: res.data.token }))
                    redirect('/my-dashboard') //Next Js
                }
                else {
                    alert(res.data.msg)
                }
            })
        e.preventDefault()
    }


    return (
        <>
            <section className='max-w-full my-10' id='myAccount'>
                <div className='max-w-[1320px] lg:mx-auto mx-2' id='myAccount-mid'>
                    <div className='w-full text-center' id='muAccount-mid-heading'>
                        <h2 className=' text-4xl font-semibold'>My Account</h2>
                        <div className='flex items-center justify-center gap-1 my-3 '>

                            <Link href={'/'} className='text-sm hover:text-[#C09578]'>Home</Link>
                            <FaAngleRight className='text-[#C09578]' />
                            <Link href={'/login'} className='text-sm text-[#C09578]'> My Account </Link >

                        </div>
                        <hr className='border-gray-300 my-5' />
                    </div>

                    <div className='grid lg:grid-cols-2 sm:grid-cols-2 gap-4' id='login-register'>
                        <div id='login'>
                            <h2 className='capitalize text-3xl'>login</h2>

                            <div className='border-1 border-gray-200 rounded-sm my-5 p-5'>
                                <form action="" onSubmit={login}>
                                    <label htmlFor="" className=''>Email</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-3' name='email' placeholder='Email Address' type="email" />
                                    <label htmlFor="" className='my-5'>Password</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-2' name='password' placeholder='Password' type="password" />
                                    <div className='my-5 flex items-center justify-between'>
                                        <p className='text-[#C09578] text-sm hover:cursor-pointer'>Lost Your Password?</p>
                                        <button className='text-white font-semibold bg-[#C09578] px-5 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-black' onClick={() => dashBoard}>Login</button>
                                    </div>
                                    <button onClick={googleLogin} type='button' className='text-white font-semibold bg-[#C09578] px-5 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-black'>Login With Google</button>

                                </form>
                            </div>
                        </div>
                        <div id='register'>
                            <h2 className='capitalize text-3xl'>Register</h2>

                            <div className='border-1 border-gray-200 rounded-sm my-5 p-5'>
                                <form onSubmit={userRegister} action="">
                                    <label htmlFor="" className=''>Email Address</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-3' name='email' placeholder='Email Address' type="email" />
                                    <label htmlFor="" className='my-5'>Full Name</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-2' name='name' placeholder='Enter your full name' type="text" />
                                    <label htmlFor="" className='my-5'>Phone Number</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-2' name='phone' placeholder='Enter your phone number' type="tel" />
                                    <label htmlFor="" className='my-5'>Password</label>&nbsp;<span className='font-bold'>*</span>
                                    <input className='w-full border-1 border-gray-300 px-4 py-2 my-2' name='password' placeholder='Password' type="password" />
                                    <div className='my-5 flex items-center justify-end'>

                                        <button className='text-white font-semibold bg-[#C09578] px-5 py-1 rounded-2xl cursor-pointer hover:text-white hover:bg-black'>Register</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
