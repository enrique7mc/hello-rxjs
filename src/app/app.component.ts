import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <button #left md-raised-button color="accent">Move Left</button>
  <button #right md-raised-button color="accent">Move Right</button>
  <button #down md-raised-button color="accent">Move Down</button>
  <div class="container">
    <div #ball class="ball"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('left') left;
  @ViewChild('right') right;
  @ViewChild('down') down;
  position: any;

  ngOnInit() {
    const left$ = Observable.fromEvent(this.getNativeElement(this.left), 'click')
                            .map(event => ({ x: -10, y: 0}));
    const right$ = Observable.fromEvent(this.getNativeElement(this.right), 'click')
                            .map(event => ({ x: 10, y: 0}));
    const down$ = Observable.fromEvent(this.getNativeElement(this.down), 'click')
                            .map(event => ({ x: 0, y: 10}));
    

    Observable.merge(left$, right$, down$)      
      .startWith({x: 200, y: 200})
      .scan((acc, curr) => Object.assign({}, acc, {x: acc.x + curr.x, y: acc.y + curr.y}))
      .subscribe(position => this.position = position);
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}