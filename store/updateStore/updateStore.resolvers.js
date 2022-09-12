import client from "../../client";

export default {
  Mutation: {
    updateStore: (_, { id, name, location, category }) =>
      client.store.update({
        where: { id },
        data: { name, location, category },
      }),
  },
};
