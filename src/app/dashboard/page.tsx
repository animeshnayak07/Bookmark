'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Bookmark = {
  id: string
  url: string
  title: string
  user_id: string
}

export default function Dashboard() {

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        window.location.href = '/'
      }
    }

    checkUser()
    fetchBookmarks()
  }, [])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
    setLoading(false)
  }

  const addBookmark = async () => {
    if (!url || !title) return

    const { data: userData } = await supabase.auth.getUser()

    await supabase.from('bookmarks').insert({
      url,
      title,
      user_id: userData.user?.id
    })

    fetchBookmarks()
    setUrl('')
    setTitle('')
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
    fetchBookmarks()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        Loading...
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">
          Bookmarks
        </h1>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Add Card */}
      <div className="max-w-3xl mx-auto mb-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Add New Bookmark</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={addBookmark}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Bookmark List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {bookmarks.length === 0 && (
          <div className="text-center text-gray-400">
            No bookmarks yet.
          </div>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="backdrop-blur-lg bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center hover:bg-white/10 transition"
          >
            <div>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-purple-400 hover:underline"
              >
                {b.title}
              </a>
              <p className="text-sm text-gray-400 break-all">
                {b.url}
              </p>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-400 hover:text-red-500 transition"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
