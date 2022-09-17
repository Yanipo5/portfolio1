import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: string;
  title: string;
  isStar: boolean;
  isDone: boolean;
  createAt: Date;
  constructor(options: Partial<Todo>) {
    this.id = uuidv4();
    this.title = options.title || "";
    this.createAt = new Date();
    this.isDone = false;
    this.isStar = false;
  }
}

type SortBy = "CreatedAt.asc" | "CreatedAt.desc" | "A-Z" | "Z-A";

export default defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
    sortBy: "CreatedAt.asc" as SortBy,
  }),
  getters: {
    unCompletedTodos: state => state.todos.filter(t => !t.isDone).sort(_sort),
    completedTodos: state => state.todos.filter(t => t.isDone).sort(_sort),
  },
  actions: {
    addTodo(todo: Pick<Todo, "title">) {
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

function _sort(a: Todo, b: Todo): number {
  if (a.isStar && b.isStar) return 0;
  if (a.isStar || b.isStar) return a.isStar ? -1 : 1;
  return 0;
}
