import { gql } from "apollo-server";

export default gql`
  type Store {
    id: Int!
    name: String!
    location: String!
    category: String!
  }
`;
