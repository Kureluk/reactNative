import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  deadline?: string;
  notificationId?: string; // щоб відмінити пізніше
}


interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
  },
});

export const { setTodos, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
