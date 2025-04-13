import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  todo: text("todo").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull(),
  deadline: text("deadline").optional()

});
