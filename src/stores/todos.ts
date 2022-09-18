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
    todos: _load(),
    sortBy: "CreatedAt.asc" as SortBy,
  }),
  getters: {
    unCompletedTodos: state => state.todos.filter(t => !t.isDone).sort(_sort),
    completedTodos: state => state.todos.filter(t => t.isDone).sort(_sort),
  },
  actions: {
    addTodo(todo: Pick<Todo, "title">) {
      this.todos.push(new Todo(todo));
      _save(this.$state.todos);
    },
    toggleTodoDone(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      });
      _save(this.$state.todos);
    },
    toggleTodoStar(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isStar: !todo.isStar };
      });
      _save(this.$state.todos);
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      _save(this.$state.todos);
    },
  },
});

function _sort(a: Todo, b: Todo): number {
  if (a.isStar && b.isStar) return 0;
  if (a.isStar || b.isStar) return a.isStar ? -1 : 1;
  return 0;
}

function _save(todos: Todo[]): void {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}
function _load(): Todo[] {
  try {
    const str = window.localStorage.getItem("todos");
    if (str) return JSON.parse(str);
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
