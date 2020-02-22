import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { Observable, Subject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  filterButtons: FilterButton[] = [
    { type: Filter.All, content: 'All', isActive: true },
    { type: Filter.Active, content: 'Active', isActive: false },
    { type: Filter.Completed, content: 'Completed', isActive: false },
  ];

  length: number = 0;

  hasCompleted$: Observable<Boolean>;
  destroy$: Subject<null> = new Subject<null>();
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todo$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );
    this.todoService.length$.pipe(takeUntil(this.destroy$))
      .subscribe(length => {
        this.length = length;
      });
  }

  filter(type: Filter) {
    this.setActiveFilter(type);
    this.todoService.filterTodos(type);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  private setActiveFilter(type: Filter) {
    this.filterButtons.forEach(it => {
      it.isActive = it.type === type;
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
