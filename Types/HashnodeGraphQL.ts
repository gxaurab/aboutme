//Hashnode Blog TYpes

export type CoverImage = {
  url: string
}

export type Post = {
  title: string
  brief: string
  url: string
  publishedAt: string
  coverImage: CoverImage
}

export type PostEdge = {
  node: Post
}

export type APIResponse = {
  publication: {
    isTeam: boolean
    title: string
    posts: {
      edges: PostEdge[]
    }
  }
}
//Hashnode Blog TYpes

//Home Screen Types
export interface JokesDetail {
    setup: string
    punchline: string
}

