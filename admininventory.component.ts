import { Component, OnInit, Injectable, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SectiondataService } from './sectiondata.service';
import { SurveydataService } from './surveydata.service';
// testApp\node_modules\primeng\components\common
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataStoreService } from 'src/app/data-store.service';

@Component({
  selector: 'app-admininventory',
  templateUrl: './admininventory.component.html',
  styleUrls: ['./admininventory.component.css']
})
export class AdmininventoryComponent implements OnInit, AfterContentInit {

  sectionData: any = [];
  surveyData: any = [];
  inventoryData: any = [];
  selectedData: any = [];
  cols: any[];
  filteredValuesLength: any;
  newArray: any = [];

  // param: any;

  constructor(public getSectionInfo: SectiondataService, public getSurveyInfo: SurveydataService, private router: Router,
    private spinner: NgxSpinnerService, private data: DataStoreService) { }

  ngOnInit() {
    this.spinner.show();
    this.sectionData = [];
    this.getSectionInfo.getSectionData().subscribe((sectionArray: {}) => {
      this.getSurveyInfo.getSurveyData().subscribe((surveyArray: {}) => {
        this.sectionData = sectionArray;
        this.surveyData = surveyArray;
        //console.log(this.sectionData );


        for (const x of this.sectionData.d.results) {
          x.thisSectionInventoryId = x.Id;

          const found = this.surveyData.d.results.filter(y => y.SurveyID === x.SurveyID).shift();
          if (found) {
            this.inventoryData.push({ ...x, ...found });
          }
        }

        this.inventoryData
          .push(... this.surveyData.d.results.filter(z => this.sectionData.d.results.map(x => x.SurveyID).indexOf(z.SurveyID) === -1));

        // console.log(this.inventoryData);
        this.inventoryData.sort((obj1, obj2) => {
          if (obj1.SurveyName.toLowerCase() > obj2.SurveyName.toLowerCase()) {
            return 1;
          }

          if (obj1.SurveyName.toLowerCase() < obj2.SurveyName.toLowerCase()) {
            return -1;
          }

          if (obj1.SurveyYear > obj2.SurveyYear) {
            return 1;
          }

          if (obj1.SurveyYear < obj2.SurveyYear) {
            return -1;
          }

          return 0;
        });

        // console.log(sortedArray);
      });
    });



    this.cols = [
      { field: 'SurveyYear', header: 'Year', width: '13%', align: 'center' },
      { field: 'SurveyName', header: 'Survey Name', width: '50%', align: 'left' },
      { field: 'Acronym', header: 'Acronym', width: '14%', align: 'center' },
      { field: 'Division', header: 'Division', width: '14%', align: 'center' }
    ];

  }

  onFilter(event, dt) {
    this.filteredValuesLength = event.filteredValue.length; // count of displayed rows
  }

  ngAfterContentInit() {
    setTimeout(() => {

      this.spinner.hide();

    }, 5000);
  }

  openSurveyItem(row) {
    // console.log(row.InventoryID.__deferred.uri.replace('/InventoryID', ''));

    // this.param = row.InventoryID.__deferred.uri.replace('/InventoryID', '');
    // router.navigate(['surveyItem/' + row.Id], { relativeTo: this.route });

    /* const navigationExtras: NavigationExtras = {
      queryParams: row
    }; */

    // this.router.navigate(['/surveyItem'], navigationExtras);

    this.data.recordData = row;

    this.router.navigate(['/surveyItem']);

  }

  openAdminItem(row) {
    // console.log(row.InventoryID.__deferred.uri.replace('/InventoryID', ''));

    // this.param = row.InventoryID.__deferred.uri.replace('/InventoryID', '');
    // router.navigate(['surveyItem/' + row.Id], { relativeTo: this.route });

    /* const navigationExtras: NavigationExtras = {
      queryParams: row
    }; */

    // this.router.navigate(['/surveyItem'], navigationExtras);

    //console.log(row);

    this.data.recordData = row;

    this.router.navigate(['/adminItem']);


  }



}
