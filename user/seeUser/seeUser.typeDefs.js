import { gql } from "apollo-server";

export default gql`
  type SeeUserStatus {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeUser(username: String!): SeeUserStatus!
  }
`;
