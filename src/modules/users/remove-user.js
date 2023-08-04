import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removeUser = async ({ id }) => {
  const user = await db("users").where({ id }).first();
  if (!user) throw new NotFoundError("User not found");

  return (await db("users").delete({ id }).returning("*"))[0];
};
