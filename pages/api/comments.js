import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_DESI_MANAGER_CMS_ENDPOINT
const ADMIN_DM_TOKEN = process.env.ADMIN_DM_TOKEN
export default async function comments(req, res) {
  console.log(ADMIN_DM_TOKEN)
  const { name, email, slug, comment } = req.body
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${ADMIN_DM_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  // {
  //   name: req.body.name,
  //   email: req.body.email,
  //   comment: req.body.comment,
  //   slug: req.body.slug,
  // }
  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  }
  catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }


}
