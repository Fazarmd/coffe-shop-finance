import { v4 } from "uuid";
import bcrypt from "bcrypt";

export const seed = (knex) => {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries
      const genSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash("adminmowkopi", genSalt);

      return knex("users").insert([
        {
          id: v4(),
          username: "admin",
          hash_password: hashPassword,
        },
        // Add more user data as needed
      ]);
    });
};
