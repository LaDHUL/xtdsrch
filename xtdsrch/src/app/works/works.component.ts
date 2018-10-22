import { Component, OnInit } from '@angular/core';

import { Work } from '../work';
import { WorksService } from '../works.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  works: Work[];
  selectedWork: Work;

  constructor(private worksService: WorksService) { }

  ngOnInit() {
    this.getWorks();
  }

  getWorks(): void {
    this.worksService.getWorks()
    .subscribe(works => this.works = works);
  }

  onSelect(work: Work): void {
    this.selectedWork = work;
  }
}
