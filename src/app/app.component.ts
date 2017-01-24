import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <div class="container">
    <div #ball class="ball"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  </div>
  `
})
export class AppComponent implements OnInit {
  position: any;

  ngOnInit() {
    const leftArrow$ = Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowLeft')
      .mapTo(position => this.decrement(position, 'x', 10));

    const rightArrow$ = Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowRight')
      .mapTo(position => this.increment(position, 'x', 10));

    const downArrow$ = Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowDown')
      .mapTo(position => this.increment(position, 'y', 10));

    const upArrow$ = Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowUp')
      .mapTo(position => this.decrement(position, 'y', 10));

    const letterA$ = Observable.fromEvent(document, 'keydown')
      .filter(event => event.keyCode === 65)
      .mapTo(position => {
        console.log('a pressed');
        return position;
      });

    Observable.merge(leftArrow$, rightArrow$, downArrow$, upArrow$, letterA$)
      .startWith({x: 200, y: 200})
      .scan((acc, curr) => curr(acc))
      .subscribe(position => this.position = position)
  }

  increment(obj, prop, value) {
    return Object.assign({}, obj, {[prop]: obj[prop] + value})
  }

  decrement(obj, prop, value) {
    return Object.assign({}, obj, {[prop]: obj[prop] - value})
  }
}