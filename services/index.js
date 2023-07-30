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