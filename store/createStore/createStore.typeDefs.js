import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createStore(name: String!, location: String!, category: String!): Store
  }
`;
