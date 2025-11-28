export const GET_USER_ARTICLES = `
  query Publication {
    publication(host: "gxaurab.hashnode.dev") {
        isTeam
        title
				posts(first: 10) {
            edges {
                node {
                    title
                    brief
                    url
                    publishedAt
                    coverImage {
                      url 
                    }
                }
            }
        }
    }
}
`;