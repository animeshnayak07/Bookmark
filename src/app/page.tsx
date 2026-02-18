'use client'

import { supabase } from '@/lib/supabase'

export default function Home() {

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center text-white">
      
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-center">
        
        <h1 className="text-3xl font-bold mb-4">
          Bookmark
        </h1>

        <p className="text-gray-400 mb-8">
          Save and manage your favorite links securely.
        </p>

        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        

      </div>
    </div>
  )
}
