import bcryptjs from "bcryptjs";

export const seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          // id: 1,
          first_name: "John",
          last_name: "Doe",
          username: "johndoe",
          password: bcryptjs.hashSync("password123", 10),
        },
        {
          // id: 2,
          first_name: "Jane",
          last_name: "Smith",
          username: "janesmith",
          password: bcryptjs.hashSync("password123", 10),
        },
      ]);
    });
};
