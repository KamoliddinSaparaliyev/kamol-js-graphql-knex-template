import db from "../../db/index.js";

export const listUsers = (filters = {}) => {
  return db("users").where(filters).select("*");
};
