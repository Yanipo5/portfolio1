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
    todos: _todoStorage.load(),
    sort: _sortStorage.load(),
    input: "",
    mode: false,
  }),
  getters: {
    unCompletedTodos: state => state.todos.filter(t => !t.isDone && _filter(t, state)).sort((a, b) => _sort(state.sort, a, b)),
    completedTodos: state => state.todos.filter(t => t.isDone && _filter(t, state)).sort((a, b) => _sort(state.sort, a, b)),
  },
  actions: {
    addTodo(todo: Pick<Todo, "title">) {
      this.todos.push(new Todo(todo));
      _todoStorage.save(this.$state.todos);
    },
    toggleTodoDone(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      });
      _todoStorage.save(this.$state.todos);
    },
    toggleTodoStar(id: string) {
      this.todos = this.todos.map(todo => {
        if (todo.id !== id) return todo;
        return { ...todo, isStar: !todo.isStar };
      });
      _todoStorage.save(this.$state.todos);
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      _todoStorage.save(this.$state.todos);
    },
    setSort(sortBy: SortBy) {
      if (this.sort.sortBy === sortBy) this.sort.sortDirection = !this.sort.sortDirection;
      this.sort.sortBy = sortBy;
      _sortStorage.save(this.$state.sort);
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

function _filter(todo: Todo, state: { input: string; mode: boolean }): boolean {
  if (!state.mode || !state.input) return true;
  return todo.title.includes(state.input);
}

const _todoStorage = {
  key: "todos",
  firstTimeUsage: true,
  save(todos: Todo[]): void {
    window.localStorage.setItem(this.key, JSON.stringify(todos));
    this.firstTimeUsage = false;
  },
  load(): Todo[] {
    try {
      const str = window.localStorage.getItem(this.key);
      if (str) {
        this.firstTimeUsage = false;
        return JSON.parse(str);
      }

      return [new Todo({ title: "Add Todo" }), new Todo({ title: "Sort Todo" }), new Todo({ title: "Complete Todo" }), new Todo({ title: "Star Todo" }), new Todo({ title: "Delete Todo" })];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

const _sortStorage = {
  key: "sort",
  save(sort: Sort): void {
    window.localStorage.setItem(this.key, JSON.stringify(sort));
  },
  load(): Sort {
    try {
      const str = window.localStorage.getItem(this.key);
      if (str) return JSON.parse(str);
      return { sortBy: "CreatedAt", sortDirection: true };
    } catch (error) {
      console.error(error);
      return { sortBy: "CreatedAt", sortDirection: true };
    }
  },
};
