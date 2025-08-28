import { METHODS } from "../utils/constant";
import client from "./client";

export const api = {
  questions: {
    ask: ({ data, ...configs }) =>
      client({
        url: "/ask",
        method: METHODS.POST,
        data,
        ...configs,
      }),
  },
};
