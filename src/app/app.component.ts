import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked {

  hasTodos$: Observable<Boolean>;

  constructor (private todoService: TodoService){}
  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodos$ = this.todoService.length$.pipe(map(length => length > 0));
  }

  ngOnChanges() {
    // console.log('parent on changes')
  }

  ngOnDestroy() {
    // console.log('parent on destroy')
  }

  ngAfterContentInit() {
    // console.log('parent after content init')
  }

  ngAfterContentChecked() {
    // console.log('parent after content checked')
  }

  ngAfterViewInit() {
    // console.log('parent after view init')

  }
  ngAfterViewChecked() {
    // console.log('parent after view checked')
  }
}

