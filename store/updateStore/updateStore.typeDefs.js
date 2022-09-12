import { gql } from "apollo-server";

export default gql`
  type Mutation {
    updateStore(
      id: Int!
      name: String
      location: String
      category: String
    ): Store
  }
`;
