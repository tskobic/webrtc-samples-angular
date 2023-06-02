import { Component } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  routes$: Observable<Routes>;

  constructor(private route: ActivatedRoute) {
    this.routes$ = this.route.data.pipe(map((data => data['routes'] as Routes)));
  }
}
