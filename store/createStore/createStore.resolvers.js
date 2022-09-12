import client from "../../client";

export default {
  Mutation: {
    createStore: (_, { name, location, category }) =>
      client.store.create({
        data: {
          name,
          location,
          category,
        },
      }),
  },
};
