import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';

  private todos: Todo[];
  private filteredTodo: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todo$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor( private storageService: LocalStorageService) { }

  fetchFromLocalStorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodo = [...this.todos];
    this.updateTodosDate();
  }

  updateToLocalStorage() {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosDate();
  }

  filterTodos(filter: Filter, isFiltering: boolean = true ) {
    this.currentFilter = filter;

    switch (filter) {
      case Filter.Active:
        this.filteredTodo = this.todos.filter(item => !item.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodo = this.todos.filter(item => item.isCompleted);
        break;
      case Filter.All:
        this.filteredTodo = [...this.todos];
        break;
    }
    if (isFiltering) {
      this.updateTodosDate();
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(it => !it.isCompleted);
    this.updateToLocalStorage();
  }

  addTodo(content: string) {
    const date  = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }

  changeTodoStatus(todo: Todo) {
    this.todos.map(t => {
      if(t.id === todo.id) {
        t.isCompleted = todo.isCompleted;
      }
    })
    this.updateToLocalStorage();

  }

  toggleAllStatus() {
    this.todos = this.todos.map(item => {
      return {
        ...item,
        isCompleted: !this.todos.every(t => t.isCompleted)
      };
    });
    this.updateToLocalStorage();
  }

  editTodo(todo: Todo) {
    this.todos.map(t => {
      if(t.id === todo.id) {
        t.content = todo.content;
      }
    })

    this.updateToLocalStorage();
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id)
    this.updateToLocalStorage();
  }

  private updateTodosDate() {
    this.displayTodoSubject.next(this.filteredTodo);
    this.lengthSubject.next(this.todos.length);
  }
}
