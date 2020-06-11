import { Component, OnInit, Injectable, AfterContentInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCollectionDataService } from './get-collection-data.service';
import { DataStoreService } from 'src/app/data-store.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()

@Component({
  selector: 'app-surveyitem',
  templateUrl: './surveyitem.component.html',
  styleUrls: ['./surveyitem.component.css']
})
export class SurveyitemComponent implements OnInit, AfterContentInit, OnChanges {
  surveyItem: any = [];
  cols: any = [];
  collectionData: any = [];
  showTable = false;
  displayCol = '';
  colSpan = 5;
  multiSortMeta: any = [];

  constructor(private route: ActivatedRoute, private collectionService: GetCollectionDataService, private data: DataStoreService,
    private spinner: NgxSpinnerService, private router: Router) {
    // his.spinner.show();

  }

  ngOnChanges() {

  }


  ngOnInit() {
    this.spinner.show();
    // console.log(this.route.queryParams);

    if (this.data.recordData) {
      // alert(this.data.recordData.length);


      this.surveyItem = this.data.recordData;
      if (this.surveyItem.OMBFrequencyOfReporting !== 'Monthly' || this.surveyItem.OMBFrequencyOfReporting !== 'Quarterly') {
        this.displayCol = 'none';
        this.colSpan = 4;
      }

      this.collectionService.setData(this.surveyItem);
      this.collectionService.getSurveyData().subscribe((collectionArray: {}) => {
        this.collectionData = collectionArray;

        // this.multiSortMeta.push({ field: 'Qual', order: 1 });
        // this.multiSortMeta.push({ field: 'Date', order: 1 });

        // console.log(collectionArray);

        //console.log(this.collectionData.d.results);
        this.collectionData.d.results.sort((obj1, obj2) => {
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
    } else {
      this.router.navigate(['/surveyinventory']);
    }



    // this.cols = [
    //   { field: 'MailTypeValue', header: 'Mail Type' },
    //   { field: 'MailOutType', header: 'Collection Type' },
    //   { field: 'InitialMailOutDate', header: 'Initial Mail Out Date' },
    //   { field: 'DueDate', header: 'Due Date' },
    //   { field: 'DueDateReminder', header: 'Due Date Reminder' },
    //   { field: 'FollowUpDate', header: 'Follow Up Date' },
    //   { field: 'SoftCloseoutDate', header: 'Soft Closeout Date' },
    //   { field: 'FinalCloseoutDate', header: 'Final Closeout Date' },
    //   //{ field: 'ReportingPeriod', header: 'Reporting Period' }
    // ];

    this.cols = [
      { field: 'Qual', header: 'Group', id: 'Qual' },
      { field: 'QualType', header: 'Qual Type', id: 'QualType', display: this.displayCol },
      { field: 'MailType', header: 'Mail Type', id: 'MailType' },
      { field: 'CollectionType', header: 'Collection Type', id: 'CollectionType' },
      { field: 'Date', header: 'Date', id: 'Date' }
    ];

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.showTable = true;
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
    //console.log(value);
    if (value == null) {
      alert('No Link Available');
    } else {
      window.open(value);
    }
  }

  print() {
    window.print();
  }

  contactOwner() {

    let imGroup = 'im:';

    this.surveyItem.Owner.split('; ').forEach(thisOwner => {
      // console.log(thisOwner);

      imGroup += '<sip:' + thisOwner.trim() + '>';
    });

    window.location.href = imGroup;
  }

}
