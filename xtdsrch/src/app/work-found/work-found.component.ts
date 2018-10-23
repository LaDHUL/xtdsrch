import { Component, OnInit, Input } from '@angular/core';
import { Work } from '../work';

@Component({
  selector: 'app-work-found',
  templateUrl: './work-found.component.html',
  styleUrls: ['./work-found.component.css']
})
export class WorkFoundComponent implements OnInit {
  @Input()
  works: Work[];

  constructor() { }

  ngOnInit() {
  }

}
