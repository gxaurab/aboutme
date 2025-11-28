import { useState } from 'react'
import { graphQLClient } from '../lib/graphQLClient'
import { GET_USER_ARTICLES } from '../models/blog-data'
import type { APIResponse, Post } from '../Types/HashnodeGraphQL'

export const useBlogs = ()=>{

      const [posts, setPosts] = useState<Post[]>([])
      const [loadingblogs, setLoading] = useState<boolean>(false)
      const [error, setError] = useState<string | null>(null)
    
        const fetchPosts = async () => {
          setLoading(true)
          try {
            const data: APIResponse = await graphQLClient.request(GET_USER_ARTICLES)
            const extractedPosts = data.publication.posts.edges.map(edge => edge.node)
            setPosts(extractedPosts)
          } catch (err: any) {
            setError(err.message || 'Error fetching posts')
          } finally {
            setLoading(false)
          }
        }

    return {posts, loadingblogs, error, fetchPosts}
}