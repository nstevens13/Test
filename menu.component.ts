import { Component, OnInit, OnChanges } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetMenuDataService } from './get-menu-data.service';
import { SpservicesService } from 'src/app/spservices.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./bootstrap.min.css']
})
export class MenuComponent implements OnInit, OnChanges {
  isNavbarCollapsed = true;
  menuData: any = [];
  displayContact: any = false;
  displayNewSurvey: any = false;
  ContactType: any;
  ContactBody: any;
  ContactObj: any = {};

  constructor(public getSectionInfo: GetMenuDataService, public spServices: SpservicesService, public router: Router) {

  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.menuData = [];
    this.getSectionInfo.getMenuData().subscribe((response: {}) => {
      this.menuData = response;
       // console.log(this.menuData.d);
    });

    this.ContactObj = {
      requestType: '',
      body: '',
      acronym: '',
      surveyName: '',
      surveyYear: '',
      surveyID: '',
      usersEmail: ''
    };
  }

  saveContactUs(newSurvey) {
    const self = this;

    if (self.ContactObj.requestType == 'Request New Survey') {
      self.ContactObj.requestType = 'New Survey Request';
      self.ContactObj.surveyID = this.generateSurveyGuid();
    }

    $().SPServices({
      operation: 'UpdateListItems',
      async: false,
      batchCmd: 'New',
      listName: 'CSIT Support',
      valuepairs: [
        ['Title', self.ContactObj.surveyID],
        ['RequestType', self.ContactObj.requestType],
        ['Body', self.ContactObj.body],
        ['Acronym', self.ContactObj.acronym],
        ['SurveyName', self.ContactObj.surveyName],
        ['SurveyYear', self.ContactObj.surveyYear],
        ['UsersEmail', self.ContactObj.usersEmail],
      ],
      completefunc: function (xData, Status) {

        alert(self.ContactObj.requestType + ' Submitted!');
        self.displayContact = false;
        self.displayNewSurvey = false;

        self.ContactObj = {
          requestType: '',
          body: '',
          acronym: '',
          surveyName: '',
          surveyYear: '',
          surveyID: '',
          usersEmail: ''
        };

       // successCall();
      }
    });
  }

  checkTarget(item) {
   // console.log(item);
  }

  showDisplayDialog() {
    this.ContactObj = {
      requestType: '',
      body: '',
      acronym: '',
      surveyName: '',
      surveyYear: '',
      surveyID: '',
      usersEmail: ''
    };

    this.displayContact = true;
  }

  showNewDialog() {
    this.displayNewSurvey = true;
  }

  generateSurveyGuid() {
    let d = new Date().getTime();
    const uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


}
