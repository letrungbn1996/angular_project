import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit,
OnChanges,
OnDestroy,
AfterViewInit,
AfterViewChecked,
AfterContentInit,
AfterContentChecked  {
  @Input() title: string;
  @Output() clickedButton = new EventEmitter<string>();

  @Output() addItem = new EventEmitter<string>();

  constructor(private _dataService: DataService) {

  }
  ngOnInit() {
    this._dataService.setTextFromHello(this.title);
  }

  addNewItem(value) {
    this.addItem.emit(value);
  }

  onclickedButton() {
    this.title = 'changes from child';
    this.clickedButton.emit(this.title);
    this._dataService.setTextFromHello(this.title);
  }

  ngOnChanges() {
    // console.log('on changes')
  }

  ngOnDestroy() {
    // console.log('on destroy')
  }

  ngAfterContentInit() {
    // console.log('after content init')
  }

  ngAfterContentChecked() {
    // console.log('after content checked')
  }

  ngAfterViewInit() {
    // console.log('after view init')

  }
  ngAfterViewChecked() {
    // console.log('after view checked')
  }

}
