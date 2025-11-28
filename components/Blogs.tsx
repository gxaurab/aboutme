"use client"
import { useEffect } from 'react'
import { useBlogs } from '../hooks/useBlogs'
import BlogButton from './BlogButtonn'

const Blogs = () => {
  const { posts, loadingblogs, error, fetchPosts } = useBlogs()
  
  useEffect(() => {
    fetchPosts()
  }, [])

  if (loadingblogs) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fuchsia-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section with Hashnode Link */}
      <div className="text-center mb-12 bg-linear-to-r from-cyan-900/50 to-fuchsia-900/50 rounded-2xl p-8 border border-cyan-700/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src="/hg.jpg" 
            alt="Hashnode"
            className='w-16 h-16 rounded-full border-2 border-fuchsia-500 shadow-lg' 
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Blogs Hashnode
            </h1>
            <p className="text-cyan-300 text-md sm:text-lg  font-serif">
              Preview my latest articles - visit Hashnode for the full experience!
            </p>
          </div>
        </div>
        
          <BlogButton text="Click To Visit"/>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <article 
            key={index} 
            className="bg-linear-to-br from-cyan-900/30 to-slate-900/30 rounded-xl overflow-hidden border border-cyan-700/30 hover:border-fuchsia-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/10"
          >
            {/* Cover Image */}
            <div className="relative overflow-hidden h-48">
              <img 
                src={post.coverImage.url} 
                alt={post.title}
                className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Date */}
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time className="text-cyan-300 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {/* Title */}
              <h2 className="text-white text-xl font-bold mb-3 line-clamp-2 leading-tight">
                {post.title}
              </h2>
              
              {/* Brief */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.brief.trim().substring(0, 120)}...
              </p>
              
              {/* Read More Button */}
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors duration-300 group"
              >
                Read Full Article
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
      
      {/* Empty State */}
      {posts.length === 0 && !loadingblogs && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-white text-xl font-bold mb-2">No posts found</h3>
          <p className="text-gray-400">Check back later for new content!</p>
        </div>
      )}
    </div>
  )
}

export default Blogs