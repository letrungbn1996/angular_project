import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _textFromHelloSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  textFromHello$: Observable<string> = this._textFromHelloSubject.asObservable();

  setTextFromHello(value: string) {
    this._textFromHelloSubject.next(value);
  }
}
