import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";

const expoDb = openDatabaseSync("todos.db");
export const db = drizzle(expoDb, { schema });

export const initDB = async () => {
  await expoDb.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      todo TEXT NOT NULL,
      completed INTEGER NOT NULL
    );
  `);
};
