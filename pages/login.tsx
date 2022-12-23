import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../services';
import Router from "next/router";

export default function Auth() {
  const [loading, SetLoading] = useState<boolean>(false);
  const [email, SetEmail] = useState<string>("");

  const handleLogin = async (email: string) => {
    try {
      SetLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
       email,
     })
     if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
   console.log(error)
     alert("حدث خطأ سلمو على!");
    } finally {
      SetLoading(false);
      Router.push('/')
    }
  };

  return (
    <div className="flex flex-col  p-6 items-center  w-25%">
      <a
        className=" mt-5 bg-gray-800 hover:bg-emerald-900
         text-white font-bold p-2 rounded text-xs    self-start "
        onClick={ ()=>  Router.push('/')}>
        ألغو رحلتي      </a>
      

      <p className=" mt-10 py-5 text-left text-emerald-700 text-xl font-medium sm:text-2xl">
        Sign in via magic link with your email below :
      </p>

      <input
        className=" dark:border-gray-700 dark:hover:bg-gray-700 p-4
         focus:outline-none  focus:border-yellow bg-gray-700 rounded-md w-full sm:w-1/3 "
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
        className=" mt-5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded      m-2 "
        disabled={loading || !email}>
        <span>{loading ? "Loading" : "Send magic link"}</span>
      </button>


    </div>
  );
}