import { Component, OnInit, Input } from '@angular/core';
import { Work } from '../work';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {
  @Input()
  work: Work;

  constructor() { }

  ngOnInit() {
  }

}
