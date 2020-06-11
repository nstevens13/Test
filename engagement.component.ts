import { Component, OnInit, Injectable, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EngagementService } from './engagement.service';

@Injectable()

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit, AfterContentInit {

  engagementData: any = [];
  rowGroupMetadata: any;
  showTr = false;

  constructor(public getEngagementInfo: EngagementService, private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this.getEngagementInfo.getData().subscribe((engagementArray: {}) => {
      this.engagementData = engagementArray;
      this.updateRowGroupMetaData();

      console.log(this.engagementData.d.results);
    });
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  checkPR() {
    if (this.showTr === false) {
      this.showTr = true;
    } else {
      this.showTr = false;
    }
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.engagementData) {
      for (let i = 0; i < this.engagementData.d.results.length; i++) {
        const rowData = this.engagementData.d.results[i];
        const program = rowData.ProjectTypeValue;
        if (i === 0) {
          this.rowGroupMetadata[program] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.engagementData.d.results[i - 1];
          const previousRowGroup = previousRowData.ProjectTypeValue;
          if (program === previousRowGroup) {
            this.rowGroupMetadata[program].size++;
          } else {
            this.rowGroupMetadata[program] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {

      this.spinner.hide();

    }, 5000);
  }

}
