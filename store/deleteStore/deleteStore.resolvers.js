import client from "../../client";

export default {
  Mutation: {
    deleteStore: (_, { id }) => client.store.delete({ where: { id } }),
  },
};
