import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _drawer: any;
  constructor() { }

  get drawer(): any {
    return this._drawer;
  }

  set drawer(value: any) {
    this._drawer = value;
  }

}
