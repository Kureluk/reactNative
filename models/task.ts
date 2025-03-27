export type NewTodo = {
    title: string;
    date: string;
    priority: "low" | "medium" | "high";
    status: "to-do" | "done";
  }