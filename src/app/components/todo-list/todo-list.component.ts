import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todo$ = this.todoService.todo$;
  }

  onChangeStatus(todo: Todo) {
    this.todoService.changeTodoStatus(todo);
  }

  onEditTodo(todo: Todo) {
    this.todoService.editTodo(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.todoService.removeTodo(todo);
  }

}
