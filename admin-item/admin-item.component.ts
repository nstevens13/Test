import { Component, OnInit, Injectable, AfterContentInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCollectionDataService } from './get-collection-data.service';
import { DataStoreService } from 'src/app/data-store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpservicesService } from 'src/app/spservices.service';
import { MessageService } from 'primeng/api';


declare var $: any;

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit, AfterContentInit, OnChanges {
  surveyItem: any = [];
  cols: any = [];
  centurionCols: any = [];
  mailOutTypes: any = [];
  mailTypes: any = [];
  collectionData: any = [];
  reportingFrequencies: any = [];
  reportingPeriods: any = [];
  FrequencyOfReporting: any;
  commentsSection: any;
  yesNo: any = [];
  mandatoryVoluntary: any = [];
  disseminationMechanisms: any = [];
  sampleYears: any = [];
  fundingTypes: any = [];
  dataCollectionModes: any = [];
  processingSystems: any = [];
  showTable = false;
  originalValue: any;
  mainEdit = true;
  hubEdit = true;
  ombEdit = true;
  collEdit = true;
  mustEdit = true;
  showDataCollectionOther = false;
  showFundingOther = false;
  disableReportingPeriod = false;
  displayDialog: boolean;
  itemId: any;
  collectionId: any;
  newCollectionArray: any = {};
  quals: any = [];
  qualTypes: any = [];
  editDialog: any;

  multiSortMeta: any = [];


  // mainCheck = 'pi pi-check';
  mainCheck = '';
  // hubCheck = 'pi pi-check';
  hubCheck = '';
  // ombCheck = 'pi pi-check';
  ombCheck = '';
  // collCheck = 'pi pi-check';
  collCheck = '';
  // mustCheck = 'pi pi-check';
  mustCheck = '';

  constructor(private route: ActivatedRoute, public collectionService: GetCollectionDataService, private data: DataStoreService,
    private spinner: NgxSpinnerService, private router: Router, public thisUser: SpservicesService,
    public messageService: MessageService) {
    // his.spinner.show();

  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.spinner.show();
    // //console.log(this.route.queryParams);

    // this.newCollectionArray = {
    //   MailType: '',
    //   MailOutType: '',
    //   StartDate: '',
    //   DueDate: '',
    //   DueDateReminder: '',
    //   EndDate: '',
    //   SoftCloseoutDate: '',
    //   FinalCloseoutDate: '',
    //   SurveyID: '',
    //   SurveyName: ''
    // };

    this.newCollectionArray = {
      SurveyID: '',
      SurveyName: '',
      MailType: '',
      CollectionType: '',
      QualType: '',
      Group: '',
      Date: ''
    };

    this.disseminationMechanisms = [
      { label: '', value: '' },
      { label: 'AFF', value: 'AFF' },
      { label: 'Excel', value: 'Excel' },
      { label: 'Sponsor Website', value: 'Sponsor Website' },
      { label: 'CEDSCI', value: 'CEDSCI' }
    ];

    this.dataCollectionModes = [
      { name: 'Centurion' },
      { name: 'eCorr' },
      { name: '' },
      { name: 'Email' },
      { name: 'Fax' }
      // { name: 'Phone' },
      // { name: 'Other' }
    ];

    this.yesNo = [
      { label: '', value: '', name: '' },
      { label: 'Yes', value: 'Yes', name: 'Yes' },
      { label: 'No', value: 'No', name: 'No' }
    ];

    this.mandatoryVoluntary = [
      { name: '' },
      { name: 'Mandatory' },
      { name: 'Voluntary' }
    ];

    this.sampleYears = [
      { name: '' },
      { name: '2017' },
      { name: '2018' },
      { name: '2019' },
      { name: '2020' },
      { name: '2021' },
      { name: '2022' },
      { name: '2023' },
      { name: '2024' },
      { name: '2025' }
    ];

    // *************************************** Old Collections Table format *******************************************
    // this.cols = [
    //   { field: 'MailTypeValue', header: 'Mail Type', id: 'MailType' },
    //   { field: 'MailOutType', header: 'Collection Type', id: 'MailOutType' },
    //   { field: 'InitialMailOutDate', header: 'Initial Mail Out Date', id: 'StartDate' },
    //   { field: 'DueDate', header: 'Due Date', id: 'DueDate' },
    //   { field: 'DueDateReminder', header: 'Due Date Reminder', id: 'DueDateReminder' },
    //   { field: 'FollowUpDate', header: 'Follow Up Date', id: 'EndDate' },
    //   { field: 'SoftCloseoutDate', header: 'Soft Closeout Date', id: 'SoftCloseoutDate' },
    //   { field: 'FinalCloseoutDate', header: 'Final Closeout Date', id: 'FinalCloseoutDate' }
    // ];

    // this.mailTypes = [
    //   { label: 'Initial 1', name: 'Initial 1' },
    //   { label: 'Initial 2', name: 'Initial 2' },
    //   { label: 'Initial 3', name: 'Initial 3' },
    //   { label: 'Initial 4', name: 'Initial 4' },
    //   { label: 'Follow Up 1', name: 'Follow Up 1' },
    //   { label: 'Follow Up 2', name: 'Follow Up 2' },
    //   { label: 'Follow Up 3', name: 'Follow Up 3' },
    //   { label: 'Follow Up 4', name: 'Follow Up 4' }
    // ];
    // *****************************************************************************************************************


    this.cols = [
      { field: 'Qual', header: 'Group', id: 'Qual' },
      //  { field: 'QualType', header: 'Qual Type', id: 'QualType' },
      { field: 'MailType', header: 'Mail Type', id: 'MailType' },
      { field: 'CollectionType', header: 'Collection Type', id: 'CollectionType' },
      { field: 'Date', header: 'Date', id: 'Date' }
    ];





    this.quals = [
      { label: '', value: '' },
      { label: 'Group A', value: 'Group A' },
      { label: 'Group B', value: 'Group B' },
      { label: 'Group C', value: 'Group C' },
      { label: 'Group D', value: 'Group D' },
      { label: 'Group-AK', value: 'Group-AK' },
      { label: 'Group-AZ', value: 'Group-AZ' },
      { label: 'Group-IA', value: 'Group-IA' },
      { label: 'Group-ND', value: 'Group-ND' },
      { label: 'Group-NJ', value: 'Group-NJ' },
      { label: 'Group-NV', value: 'Group-NV' },
      { label: 'Group-NY', value: 'Group-NY' }
    ];

    this.qualTypes = [
      { label: '', value: '' },
      { label: 'Certainty', value: 'Certainty' },
      { label: 'Birth', value: 'Birth' },
      { label: 'Non-certainty', value: 'Non-certainty' },
      { label: 'Other', value: 'Other' }
    ];

    this.mailTypes = [
      { label: '', value: '' },
      { label: 'Initial', value: 'Initial' },
      { label: 'Initial Birth', value: 'Initial Birth' },
      { label: 'Follow-Up', value: 'Follow-Up' },
      { label: 'Due Date', value: 'Due Date' },
      { label: 'Due Date Reminder', value: 'Due Date Reminder' },
      { label: 'Due Date Reminder Births', value: 'Due Date Reminder Births' },
      { label: 'Telephone Follow-Up', value: 'Telephone Follow-Up' },
      { label: 'Soft Closeout', value: 'Soft Closeout' },
      { label: 'Final Closeout', value: 'Final Closeout' },
      { label: 'Inbound TQA', value: 'Inbound TQA' },
      { label: 'Centurion Open', value: 'Centurion Open Date' },
      { label: 'Centurion Closed', value: 'Centurion Closed Date' },
      { label: 'Field Open', value: 'Field Open' },
      { label: 'Field Closeout', value: 'Field Closeout' },
    ];
    this.centurionCols = [
      { field: 'CenturionOpen', header: 'Centurion Open Date' },
      { field: 'CenturionClosed', header: 'Centurion Closed Date' }
    ];
    this.mailOutTypes = [
      { label: '', value: '' },
      { label: 'Email', value: 'Email' },
      { label: 'Fax', value: 'Fax' },
      { label: 'Letter', value: 'Letter' },
      { label: 'Phone', value: 'Phone' },
      { label: 'Form', value: 'Form' },
      { label: 'Phone Email', value: 'Phone Email' },
    ];




    this.fundingTypes = [
      { name: '', value: '' },
      { name: 'Reimbursable', value: 'Reimbursable' },
      { name: 'Appropriated', value: 'Appropriated' },
      { name: 'Other', value: 'Other' }
    ];

    this.processingSystems = [
      { name: '' },
      { name: 'Business Register' },
      { name: 'Exports Net Records' },
      { name: 'Import Net Records' },
      { name: 'StEPS' },
      { name: 'StEPS II' }
    ];

    this.reportingFrequencies = [
      { name: '', label: '', value: '' },
      { name: 'Monthly', label: 'Monthly', value: 'Monthly' },
      { name: 'Quarterly', label: 'Quarterly', value: 'Quarterly' },
      { name: 'Annual', label: 'Annual', value: 'Annual' },
      { name: 'Biennial', label: 'Biennial', value: 'Biennial' },
      { name: 'Quinquennial', label: 'Quinquennial', value: 'Quinquennial' },
      { name: 'Continuous', label: 'Continuous', value: 'Continuous' },
      { name: 'Periodic', label: 'Periodic', value: 'Periodic' },
      { name: 'One Time', label: 'One Time', value: 'One Time' },
      { name: 'No Fixed Frequency', label: 'No Fixed Frequency', value: 'No Fixed Frequency' }
    ];
    // No reporting period for anything but Monthly and Quarterly

    /*this.reportingPeriod = [
      {

      }
    ]*/


    // alert(this.thisUser.currentUser);



    // //console.log(this.surveyItem.OMBFrequencyOfReporting);

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.showTable = true;


      if (this.data.recordData) {
        // alert(this.data.recordData.length);
        // //console.log(this.data.recordData);

        this.surveyItem = this.data.recordData;
        // console.log(this.surveyItem);
        //this.itemId = this.surveyItem.InventoryID.__deferred.uri.split('(')[1].split(')')[0];

        //this.itemId = this.surveyItem.InventoryID;
        this.itemId = this.surveyItem.thisSectionInventoryId;

        // alert(this.itemId);
        this.collectionService.setData(this.surveyItem);
        this.collectionService.getSurveyData().subscribe((collectionArray: {}) => {
          this.collectionData = collectionArray;
          // //console.log(this.collectionData);
          this.collectionId = this.collectionData.Id;
          // this.multiSortMeta.push({ field: 'Date', order: 1 });
          // this.multiSortMeta.push({ field: 'Qual', order: 1 });


          this.collectionData.d.results.sort((obj1, obj2) => {

            if (obj1.Qual == null) {
              obj1.Qual = '';
            }
            if (obj2.Qual == null) {
              obj2.Qual = '';
            }

            if (obj1.Qual.toLowerCase() > obj2.Qual.toLowerCase()) {
              return 1;
            }

            if (obj1.Qual.toLowerCase() < obj2.Qual.toLowerCase()) {
              return -1;
            }

            if (new Date(obj1.Date) > new Date(obj2.Date)) {
              return 1;
            }

            if (new Date(obj1.Date) < new Date(obj2.Date)) {
              return -1;
            }

            return 0;
          });

        });

        if (this.mainEdit === false) {
          this.mainCheck = 'pi pi-check';
        } else {
          this.mainCheck = '';
        }

        // //console.log(this.surveyItem.HUB + ' - ' + this.thisUser.currentUser);
        // //console.log(this.surveyItem.HUB.indexOf(this.thisUser.currentUser));

        // alert(this.thisUser.currentUser);



        if (this.surveyItem.HUB && this.surveyItem.HUB.toLowerCase().indexOf(this.thisUser.currentUser.toLowerCase()) > -1) {
          // //console.log(this.surveyItem.HUB.toLowerCase() + ' - ' +
          //  (this.surveyItem.HUB.indexOf(this.thisUser.currentUser.toLowerCase()) > -1));

          // //console.log(this.surveyItem.HUB.toLowerCase() + ' - ' + (this.surveyItem.HUB.indexOf('arminta.n.quash@census.gov') > -1));

          this.hubEdit = false;
          this.hubCheck = 'pi pi-check';
        }

        if (this.surveyItem.OMB && this.surveyItem.OMB.toLowerCase().indexOf(this.thisUser.currentUser.toLowerCase()) > -1) {
          this.ombEdit = false;
          this.ombCheck = 'pi pi-check';
        }

        if (this.surveyItem.Main && this.surveyItem.Main.toLowerCase().indexOf(this.thisUser.currentUser.toLowerCase()) > -1) {
          this.mainEdit = false;
          this.mainCheck = 'pi pi-check';
        }

        if (this.surveyItem.Collections && this.surveyItem.Collections.toLowerCase()
          .indexOf(this.thisUser.currentUser.toLowerCase()) > -1) {
          this.collEdit = false;
          this.collCheck = 'pi pi-check';
        }

        if (this.surveyItem.Must && this.surveyItem.Must.toLowerCase().indexOf(this.thisUser.currentUser.toLowerCase()) > -1) {
          this.mustEdit = false;
          this.mustCheck = 'pi pi-check';
        }

        if (!this.surveyItem.MAINIndicator) {
          this.surveyItem.MAINIndicator = '';
        }

        if (!this.surveyItem.MAINReimbursable) {
          this.surveyItem.MAINReimbursable = '';
        }

        if (!this.surveyItem.MAINSampleTaken) {
          this.surveyItem.MAINSampleTaken = '';
        }

        if (!this.surveyItem.HUBMissionCritical) {
          this.surveyItem.HUBMissionCritical = '';
        }

        if (!this.surveyItem.HUBFundingType) {
          this.surveyItem.HUBFundingType = '';
        }

        if (!this.surveyItem.OMBMandatoryVoluntary) {
          this.surveyItem.OMBMandatoryVoluntary = '';
        }

        if (!this.surveyItem.OMBFrequencyOfReporting) {
          this.surveyItem.OMBFrequencyOfReporting = '';
          this.FrequencyOfReporting = this.surveyItem.OMBFrequencyOfReporting;
        } else {
          this.FrequencyOfReporting = this.surveyItem.OMBFrequencyOfReporting;
        }



        this.checkQualTypes();
        // //console.log(this.FrequencyOfReporting);
        // //console.log(this.surveyItem.OMBFrequencyOfReporting);

      } else {
        this.router.navigate(['/adminInventory']);
      }

      this.spinner.hide();
    }, 5000);
  }


  downloadButtonPush() {
    const csvData = this.ConvertToCSV(this.surveyItem);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const filename = 'CSVExport.csv';

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CSVExport.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  ConvertToCSV(objArray: any): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (const index in objArray[0]) {
      // Now convert each value to string and comma-separated
      if (index) {
        row += index + ',';
      }
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in array[i]) {
        if (index) {
          if (line !== '') {
            line += ',';
          }
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  openWebLink(value) {
    // //console.log(value);
    if (value == null) {
      alert('No Link Available');
    } else {
      window.open(value);
    }
  }

  storeCurrentVal(value) {
    // console.log(value);
    // console.log(value);

    if (value) {
      if (value.name) {
        // //console.log(value.name);
        this.originalValue = value.name;
      } else {
        this.originalValue = value;
      }
    } else {

      this.originalValue = null;
    }

    // console.log(this.originalValue);
  }

  storeCurrentValCollectionDates(value) {
    // console.log(value);


    if (value) {
      //console.log(value);
      this.originalValue = value;
    } else {
      //console.log(value);
      this.originalValue = value;
    }
  }

  saveDropDownValue(thisElement, FieldName) {
    if (FieldName === 'Frequency Of Reporting') {
      this.FrequencyOfReporting = thisElement.value;
      //console.log(this.FrequencyOfReporting);
      //console.log(this.surveyItem.OMBFrequencyOfReporting);
    }
  }

  checkQualTypes() {

    if (this.surveyItem.OMBFrequencyOfReporting.value === 'Monthly' || this.surveyItem.OMBFrequencyOfReporting === 'Monthly') {
      this.quals = [
        { label: '', value: '' },
        { label: '01-January', value: '01-January' },
        { label: '02-February', value: '02-February' },
        { label: '03-March', value: '03-March' },
        { label: '04-April', value: '04-April' },
        { label: '05-May', value: '05-May' },
        { label: '06-June', value: '06-June' },
        { label: '07-July', value: '07-July' },
        { label: '08-August', value: '08-August' },
        { label: '09-September', value: '09-September' },
        { label: '10-October', value: '10-October' },
        { label: '11-November', value: '11-November' },
        { label: '12-December', value: '12-December' }
      ];

      // return this.reportingPeriods;

    } else if (this.surveyItem.OMBFrequencyOfReporting.value === 'Quarterly' || this.surveyItem.OMBFrequencyOfReporting === 'Quarterly') {
      this.quals = [
        { label: '', value: '' },
        { label: 'Q1', value: 'Q1' },
        { label: 'Q2', value: 'Q2' },
        { label: 'Q3', value: 'Q3' },
        { label: 'Q4', value: 'Q4' }
      ];

    } else {

      // this.disableReportingPeriod = true;
      // return this.reportingPeriods = [];
      this.quals = [
        { label: '', value: '' },
        { label: 'Group A', value: 'Group A' },
        { label: 'Group B', value: 'Group B' },
        { label: 'Group C', value: 'Group C' },
        { label: 'Group D', value: 'Group D' },
        { label: 'Group-AK', value: 'Group-AK' },
        { label: 'Group-AZ', value: 'Group-AZ' },
        { label: 'Group-IA', value: 'Group-IA' },
        { label: 'Group-ND', value: 'Group-ND' },
        { label: 'Group-NJ', value: 'Group-NJ' },
        { label: 'Group-NV', value: 'Group-NV' },
        { label: 'Group-NY', value: 'Group-NY' }
      ];
    }
  }

  checkDataCollectionMode(thisElement, value, column) {

    //console.log(value.name);

    if (value.name === 'Other') {
      this.showDataCollectionOther = true;
      // this.updatedMessage(value, column);

    } else {
      this.updatedMessage(thisElement, value.name, column);
      this.showDataCollectionOther = false;
    }
  }


  checkFundingType(thisElement, value, column) {

    // //console.log(value.name);

    if (value.name === 'Other') {
      this.showFundingOther = true;
      // this.updatedMessage(value, column);

    } else {
      this.updatedMessage(thisElement, value.name, column);
      this.showFundingOther = false;
    }
  }



  updatedMessage(thisElement, value, column) {

    // console.log(this.originalValue + ' - ' + value);


    if (this.originalValue === value) {
      // Do Nothing
    } else {
      const self = this;
      this.saveToList(thisElement, value, function () {
        // self.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
        self.originalValue = value;
      });
    }
  }

  updatedMessageDropDown(thisElement, value, column, dd) {

    // if (thisElement === 'MAIN_x002d_Reimbursable' && value.name === 'No') {

    // }

    // alert(dd);

    // //console.log(this.originalValue + ' - ' + value.name);

    if (this.originalValue === value.name) {
      // Do Nothing
    } else {
      const self = this;
      this.saveToList(thisElement, value.name, function () {
        // self.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
        self.originalValue = value.name;
        // value = self.originalValue;
        // self.surveyItem.OMBFrequencyOfReporting.value = value.name;

        // //console.log(self);

        self.checkQualTypes();
      });
    }
  }

  updatedMessageCollections(thisElement, value, column, thisId) {

    //console.log(value);

    if (value == 'mm/dd/yyyy' || value == null) {
      value = '';
    }

    if (this.originalValue == null || this.originalValue == 'mm/dd/yyyy') {
      this.originalValue = '';
    }

    if (this.originalValue === value) {
      // Do Nothing
    } else {
      const self = this;
      // this.saveToListCollections(thisElement, value, thisId, function () {
      //   self.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
      //   self.originalValue = value;
      // });
    }
  }

  updatedMessageCollDrop(thisElement, value, column, thisId) {

    //console.log(value);

    if (this.originalValue === value.name) {
      // Do Nothing
    } else {
      const self = this;
      // this.saveToListCollections(thisElement, value, thisId, function () {
      //   self.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
      //   self.originalValue = value.name;
      // });
    }
  }

  showMessage(value, column) {

    // this.updatedMessage(value, column);

    // this.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
    this.originalValue = value;
  }

  updatedMessageMustHaves(thisElement, value, column) {

    // //console.log(thisElement);
    // //console.log(thisItem.MUSTLastUpdated);

    // this.messageService.add({ severity: 'success', summary: 'System Message', detail: row + 'Updated' });
    // //console.log(this.originalValue + ' - ' + value);
    // //console.log(this.originalValue === value);

    if (this.originalValue === value) {
      // Do Nothing
    } else {
      this.surveyItem.MUSTLastUpdated = new Date().toLocaleDateString();
      const self = this;
      this.saveToListMustHave(thisElement, value, column, function (val, col) {
        // self.messageService.add({ severity: 'success', life: 20000, summary: 'System Message', detail: column + ' Updated' });
        self.originalValue = value;
        // self.showMessage(val, col);

      });
    }
  }



  showDialogToAdd() {

    this.editDialog = false;

    this.newCollectionArray = {
      SurveyID: '',
      SurveyName: '',
      MailType: '',
      CollectionType: '',
      QualType: '',
      Group: '',
      Date: ''
    };

    this.displayDialog = true;
  }

  clearCollectionType() {
    if (this.newCollectionArray.QualTypeOther) {
      this.newCollectionArray.QualTypeOther = '';
    }
  }


  editCollections(row, index) {
    //console.log(row);

    this.editDialog = true;

    this.newCollectionArray = {
      // SurveyID: this.collectionData[index].SurveyID,
      SurveyName: this.collectionData.d.results[index].SurveyName,
      MailType: this.collectionData.d.results[index].MailType,
      CollectionType: this.collectionData.d.results[index].CollectionType,
      QualType: this.collectionData.d.results[index].QualType,
      Group: this.collectionData.d.results[index].Qual,
      Date: this.collectionData.d.results[index].Date,
      ListItemId: this.collectionData.d.results[index].Id
    };

    this.displayDialog = true;
  }

  deleteConfirm(row, index) {
    const c = confirm('Are you sure you want to delete this row?');

    if (c === true) {
      this.deleteRow(row, index);
    }
  }

  deleteRow(row, index) {
    // //console.log(row);
    // //console.log(index);
    // //console.log(thisId);

    const self = this;

    $().SPServices({
      operation: 'UpdateListItems',
      async: true,
      batchCmd: 'Delete',
      listName: 'Collections',
      ID: row.Id,
      completefunc(xData, Status) {

        alert('Record Deleted!');
        self.collectionService.setData(self.surveyItem);
        self.collectionService.getSurveyData().subscribe((collectionArray: {}) => {
          self.collectionData = collectionArray;
          self.collectionId = self.collectionData.Id;
          self.collectionData.d.results.sort((obj1, obj2) => {

            if (obj1.Qual == null) {
              obj1.Qual = '';
            }
            if (obj2.Qual == null) {
              obj2.Qual = '';
            }

            if (obj1.Qual.toLowerCase() > obj2.Qual.toLowerCase()) {
              return 1;
            }

            if (obj1.Qual.toLowerCase() < obj2.Qual.toLowerCase()) {
              return -1;
            }

            if (new Date(obj1.Date) > new Date(obj2.Date)) {
              return 1;
            }

            if (new Date(obj1.Date) < new Date(obj2.Date)) {
              return -1;
            }

            return 0;
          });
        });
      }
    });

  }

  saveToList(thisElement, value, successCall) {
    // new Date(value).toISOString()

    const self = this;

    // console.log(value);
    // console.log(this.itemId);
    // console.log(thisElement);

    if (thisElement === 'OMB_x002d_ExpDate') {
      value = new Date(value).toISOString();
    }

    if (value === 'null' || value === null) {
      value = '';
    }

    $().SPServices({
      operation: 'UpdateListItems',
      async: true,
      batchCmd: 'Update',
      listName: 'Section Inventory',
      ID: this.itemId,
      valuepairs: [[thisElement, value]],
      completefunc(xData, Status) {
        // alert('completed');
        // console.log(xData);
        successCall();
      }
    });
  }

  saveToListCollections() {

    const self = this;
    // //console.log(this.newCollectionArray);
    let errorCount = 0;
    let errorText = '';

    if (this.newCollectionArray.QualTypeOther) {
      this.newCollectionArray.QualType = this.newCollectionArray.QualTypeOther;
    }


    for (const [key, value] of Object.entries(this.newCollectionArray)) {


      if (value == null && key != 'CollectionType' || value == 'null' && key != 'CollectionType') {

        if (key.indexOf('QualType') < 0) {
          errorCount++;
          // console.log(key);
          const thisKey = key.replace(/([A-Z])/g, ' $1');

          errorText += thisKey.charAt(0).toUpperCase() + thisKey.slice(1) + ' is required! \n';
        } else {
          this.newCollectionArray[key] = '';
        }
      }
    }

    if (errorCount > 0) {
      alert('Please correct the following errors: \n \n' + errorText);
    } else {

      // console.log(this.newCollectionArray.CollectionType);


      if (this.newCollectionArray.CollectionType == null || this.newCollectionArray.CollectionType == 'null') {
        this.newCollectionArray.CollectionType = '';
      }

      $().SPServices({
        operation: 'UpdateListItems',
        async: true,
        batchCmd: 'Update',
        listName: 'Collections',
        ID: this.newCollectionArray.ListItemId,
        valuepairs: [
          ['MailType', this.newCollectionArray.MailType],
          ['QualType', this.newCollectionArray.QualType],
          ['CollectionType', this.newCollectionArray.CollectionType],
          ['Date', this.newCollectionArray.Date],
          ['Qual', this.newCollectionArray.Group]
        ],
        completefunc(xData, Status) {
          self.collectionService.setData(self.surveyItem);
          self.collectionService.getSurveyData().subscribe((collectionArray: {}) => {
            self.collectionData = collectionArray;
            self.collectionId = self.collectionData.Id;


            self.collectionData.d.results.sort((obj1, obj2) => {

              if (obj1.Qual == null) {
                obj1.Qual = '';
              }
              if (obj2.Qual == null) {
                obj2.Qual = '';
              }

              if (obj1.Qual.toLowerCase() > obj2.Qual.toLowerCase()) {
                return 1;
              }

              if (obj1.Qual.toLowerCase() < obj2.Qual.toLowerCase()) {
                return -1;
              }

              if (new Date(obj1.Date) > new Date(obj2.Date)) {
                return 1;
              }

              if (new Date(obj1.Date) < new Date(obj2.Date)) {
                return -1;
              }

              return 0;
            });

            self.displayDialog = false;
          });
        }
      });
    }
  }

  saveNewCollections() {

    const self = this;
    let errorCount = 0;
    let errorText = '';

    if (this.newCollectionArray.QualTypeOther) {
      this.newCollectionArray.QualType = this.newCollectionArray.QualTypeOther;
    }


    for (const [key, value] of Object.entries(this.newCollectionArray)) {
      // //console.log(key);
      if (value == '' && key != 'CollectionType') {

        if (key.indexOf('QualType') < 0 && key.indexOf('Survey') < 0) {
          errorCount++;
          const thisKey = key.replace(/([A-Z])/g, ' $1');

          errorText += thisKey.charAt(0).toUpperCase() + thisKey.slice(1) + ' is required! \n';
        } else {
          this.newCollectionArray[key] = '';
        }
      }
    }

    if (errorCount > 0) {
      alert('Please correct the following errors: \n \n' + errorText);
    } else {
      //  //console.log(this.newCollectionArray);

      $().SPServices({
        operation: 'UpdateListItems',
        async: true,
        batchCmd: 'New',
        listName: 'Collections',
        valuepairs: [
          ['MailType', this.newCollectionArray.MailType],
          ['QualType', this.newCollectionArray.QualType],
          ['CollectionType', this.newCollectionArray.CollectionType],
          ['Date', this.newCollectionArray.Date],
          ['Qual', this.newCollectionArray.Group],
          ['Title', this.surveyItem.SurveyID],
          ['Acronym', this.surveyItem.Acronym],
          ['SurveyName', this.surveyItem.SurveyName]
          // ['ReportingFrequency', this.surveyItem.OMBFrequencyOfReporting]
        ],
        completefunc(xData, Status) {
          console.log(xData);
          self.collectionService.setData(self.surveyItem);
          self.collectionService.getSurveyData().subscribe((collectionArray: {}) => {
            self.collectionData = collectionArray;
            self.collectionId = self.collectionData.Id;

            self.collectionData.d.results.sort((obj1, obj2) => {

              if (obj1.Qual == null) {
                obj1.Qual = '';
              }
              if (obj2.Qual == null) {
                obj2.Qual = '';
              }

              if (obj1.Qual.toLowerCase() > obj2.Qual.toLowerCase()) {
                return 1;
              }

              if (obj1.Qual.toLowerCase() < obj2.Qual.toLowerCase()) {
                return -1;
              }

              if (new Date(obj1.Date) > new Date(obj2.Date)) {
                return 1;
              }

              if (new Date(obj1.Date) < new Date(obj2.Date)) {
                return -1;
              }

              return 0;
            });
          });

          self.displayDialog = false;
        }
      });
    }

  }

  saveToListMustHave(thisElement, value, column, successCall) {
    // //console.log('ID = ' + this.itemId + ', Column = ' + thisElement + ', Value = ' + value);

    if (value === 'null' || value === null) {
      value = '';
    }

    $().SPServices({
      operation: 'UpdateListItems',
      async: true,
      batchCmd: 'Update',
      listName: 'Section Inventory',
      ID: this.itemId,
      valuepairs: [[thisElement, value], ['MUST_x002d_LastUpdated', this.surveyItem.MUSTLastUpdated]],
      completefunc(xData, Status) {
        // //console.log(xData);
        // alert('completed');
        successCall(value, column);
      }
    });
  }

  print() {
    window.print();
  }

  convertDate(thisDate) {
    if (thisDate && thisDate.indexOf('Date') > -1) {
      const date = thisDate.split('(')[1].split(')')[0];
      return new Date(parseFloat(date)).toLocaleDateString();
    }
  }

  getRaNoteHistory(itemID) {
    this.commentsSection = '';

    // $('.raNoteComment').html('');

    $().SPServices({
      operation: 'GetVersionCollection',
      strlistID: 'Survey Inventory',
      strlistItemID: itemID,
      strFieldName: 'PrivateNotes',
      completefunc(xData, Status) {
        // alert(xData.responseText);
        this.commentsSection = '';
        $(xData.responseText).find('Version').each(function (i) {
          const editor = $(this).attr('Editor').split('#');
          // //console.log(this);
          this.commentsSection += '<div class=\'raNoteComment\' style=\'padding: 5px; width: 298px;\' thisdate=\'' +
            new Date($(this).attr('Modified')) + '\'><p>' + $(this).attr('privatenotes') + '</p><i>By: ' + editor[1] + ' ' +
            new Date($(this).attr('Modified')).toLocaleDateString('en-US') + '</i><hr /></div>';
        });


        // $('#raNotesInput').html('');
        // $('#raNotesExisting').html('');
        // $('#raNotesExisting').append(this.commentsSection);
        /*
        if (onSuccess !== undefined && onSuccess != null) {

          onSuccess(this.commentsSection);
        }
        */
      }
    });

  }

}
