import { defineStore } from "pinia";
// import type { Todo } from "@/types/all.types";
import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: string;
  title: string;
  isStar?: boolean;
  isDone?: boolean;
  createAt: Date;
  dueDate?: Date;
  constructor(options: Partial<Todo>) {
    this.id = uuidv4();
    this.title = options.title || "";
    this.createAt = new Date();
  }
}

export default defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(todo: Omit<Todo, "id" | "createAt">) {
      this.todos.push(new Todo(todo));
    },
    toggleTodoDone(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      });
    },
    toggleTodoStar(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isStar: !todo.isStar };
      });
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
  },
});
