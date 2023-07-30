import { graphql } from "graphql";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_DESI_MANAGER_CMS_ENDPOINT


export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                email
                photo {
                  url
                }
              }
              slug
              title
              createdAt
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }      
    `

    const results = await request(graphqlAPI, query);

    return results.postsConnection.edges;
}
// await request(graphqlAPI, query)
export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails(){
        posts(
            orderBy : createdAt_ASC
            last:5
        )
        {
            title
            createdAt
            slug
            featuredImage {
                url
            }
        }
    }
   `
    const results = await request(graphqlAPI, query);

    return results.posts;
}

export const getSimilarPosts = async () => {
    const query = gql`
        query getPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: {slug_not: $slug, AND:{categories_some: {slug_in: $categories}}}
                last:3
            )
            {
                title
                createdAt
                slug
                featuredImage {
                    url
                }
            }
        }

    `
    const results = await request(graphqlAPI, query);

    return results.posts;
}


export const getCategories = async () => {
    const query = gql`
    query getCategories{
        categories {
            name
            slug
        }
    }
    `
    const results = await request(graphqlAPI, query);

    return results.categories;
}