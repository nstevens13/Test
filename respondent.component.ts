import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RespondentDataService } from './respondent-data.service';

@Component({
  selector: 'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls: ['./respondent.component.css']
})
export class RespondentComponent implements OnInit, AfterContentInit {

  respondentData: any = [];
  cols: any[];

  constructor(private router: Router, private spinner: NgxSpinnerService, public getRespondentInfo: RespondentDataService) { }

  ngOnInit() {
    this.spinner.show();
    this.respondentData = [];
    this.getRespondentInfo.getData().subscribe((response: {}) => {
      this.respondentData = response;
      console.log(this.respondentData);
    });



    this.cols = [
      { field: 'Selectedtype', header: 'Request Type' },
      { field: 'SurveyName', header: 'Survey' },
      { field: 'RequestedBy', header: 'Requested By' },
      { field: 'ModifiedCalc', header: 'Modified' },
      { field: 'CreatedCalc', header: 'Created' },
    ];
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.spinner.hide();

    }, 5000);
  }

}
