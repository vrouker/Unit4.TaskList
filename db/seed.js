import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { registerUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await registerUser ({
    username: "jjohnson",
    password: "password"});

  await createTask ({
    title: "Feed Archie",
    done: "false",
    user_id: 1});

  await createTask ({
    title: "Grade papers",
    done: "false",
    user_id: 1});

    await createTask({
      title: "Order supplies",
      done: "false",
      user_id: 1});

};
