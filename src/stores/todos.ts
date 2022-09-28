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

export type SortBy = "CreatedAt" | "Title";
type Sort = {
  sortBy: SortBy;
  sortDirection: boolean;
};

export default defineStore("todos", {
  state: () => ({
    todos: _load(),
    sort: { sortBy: "CreatedAt", sortDirection: true } as Sort,
  }),
  getters: {
    unCompletedTodos: state => state.todos.filter(t => !t.isDone).sort((a, b) => _sort(state.sort, a, b)),
    completedTodos: state => state.todos.filter(t => t.isDone).sort((a, b) => _sort(state.sort, a, b)),
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
    setSort(sortBy: SortBy) {
      if (this.sort.sortBy === sortBy) this.sort.sortDirection = !this.sort.sortDirection;
      this.sort.sortBy = sortBy;
    },
  },
});

function _sort(sort: Sort, a: Todo, b: Todo): number {
  if (a.isStar !== b.isStar && (a.isStar || b.isStar)) return a.isStar ? -1 : 1;

  const direction = sort.sortDirection ? 1 : -1;
  switch (sort.sortBy) {
    case "CreatedAt":
      const res = new Date(a.createAt).getTime() <= new Date(b.createAt).getTime() ? 1 : -1;
      return res * direction;
    case "Title":
      return a.title.localeCompare(b.title) * direction;
    default:
      const x: never = sort.sortBy;
      throw new Error(x);
  }
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
