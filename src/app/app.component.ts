import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <app-line
    *ngFor="let line of lines" [line]="line">
  </app-line>
  `
})
export class AppComponent implements OnInit {
  lines: any[] = [];
  ngOnInit() {
    const emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };

    // Observable.fromEvent(document, 'click')
    Observable.fromEvent(document, 'mousemove')
      .map(event => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left,
          y: event.pageY - offset.top
        };
      })
      .pairwise(2)
      .map(positions => {
        const p1 = positions[0];
        const p2 = positions[1];
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      })
      .startWith(emptyLine)
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}