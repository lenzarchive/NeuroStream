import { useState, useEffect } from 'react'
import Head from 'next/head'

interface User {
  id: string
  name: string
  email: string
}

interface Post {
  id: string
  title: string
  content: string
  author: { name: string }
  createdAt: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    content: ''
  })
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts')
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.ok) {
        if (isLogin) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        setFormData({ name: '', email: '', password: '', title: '', content: '' })
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (!token) return

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: formData.title, content: formData.content })
      })

      const data = await res.json()

      if (res.ok) {
        setPosts([data, ...posts])
        setFormData({ ...formData, title: '', content: '' })
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Failed to create post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <>
      <Head>
        <title>NeuroStream - Advanced Social Platform</title>
        <meta name="description" content="Next-gen social platform with neural-inspired design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <main className="relative z-10">
          {/* Navigation */}
          <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded opacity-90"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      NeuroStream
                    </h1>
                    <p className="text-xs text-gray-400">Neural Social Platform</p>
                  </div>
                </div>
                
                {user && (
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">Connected</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-6 py-12">
            {!user ? (
              <div className="max-w-md mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
                    Welcome to the Future
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Experience the next evolution of social interaction
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  {/* Tab Switcher */}
                  <div className="flex mb-8 p-1 bg-black/40 rounded-2xl">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                        isLogin 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Neural Link
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                        !isLogin 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Initialize
                    </button>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-6">
                    {!isLogin && (
                      <div className="space-y-2">
                        <label className="text-gray-300 text-sm font-medium">Neural Identity</label>
                        <input
                          type="text"
                          placeholder="Enter your neural identity"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          required
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-gray-300 text-sm font-medium">Neural Address</label>
                      <input
                        type="email"
                        placeholder="neural@address.stream"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-300 text-sm font-medium">Security Key</label>
                      <input
                        type="password"
                        placeholder="Enter security key"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{isLogin ? 'Connecting...' : 'Initializing...'}</span>
                        </div>
                      ) : (
                        isLogin ? 'Establish Connection' : 'Initialize Neural Link'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Post */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Neural Broadcast</h3>
                      <p className="text-gray-400">Share your thoughts to the stream</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreatePost} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-gray-300 text-sm font-medium">Stream Title</label>
                      <input
                        type="text"
                        placeholder="What's streaming through your mind?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-300 text-sm font-medium">Neural Stream</label>
                      <textarea
                        placeholder="Broadcast your neural patterns..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Broadcasting...</span>
                        </div>
                      ) : (
                        'Broadcast to Stream'
                      )}
                    </button>
                  </form>
                </div>

                {/* Neural Stream Feed */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white">Neural Stream</h3>
                      <p className="text-gray-400">Live consciousness feed</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <div 
                          key={post.id} 
                          className="bg-black/30 border border-white/5 rounded-2xl p-6 hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02] animate-fadeInUp"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {post.author.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{post.author.name}</p>
                                <p className="text-gray-500 text-sm">
                                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-white font-semibold text-lg mb-3">
                            {post.title}
                          </h4>
                          
                          {post.content && (
                            <p className="text-gray-300 leading-relaxed">
                              {post.content}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                                <div className="w-5 h-5 bg-current rounded opacity-60"></div>
                                <span className="text-sm">Neural Link</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                                <div className="w-5 h-5 bg-current rounded opacity-60"></div>
                                <span className="text-sm">Amplify</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                        </div>
                        <p className="text-gray-400 text-lg mb-2">Neural stream is quiet</p>
                        <p className="text-gray-500 text-sm">Be the first to broadcast your thoughts</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  )
}