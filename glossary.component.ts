import { Component, OnInit, Injectable, AfterContentInit } from '@angular/core';
import { GetglossarydataService } from './getglossarydata.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit, AfterContentInit {

  glossaryData: any = [];
  selectedData: any = [];
  cols: any[];

  constructor(public getGlossaryInfo: GetglossarydataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.glossaryData = [];
    this.getGlossaryInfo.getGlossaryData().subscribe((response: {}) => {
      this.glossaryData = response;
      // console.log(this.glossaryData);

      this.glossaryData.d.results.sort((obj1, obj2) => {

        if (obj1.Title == null) {
          obj1.Title = '';
        }
        if (obj2.Title == null) {
          obj2.Title = '';
        }

        if (obj1.Title.toLowerCase() > obj2.Title.toLowerCase()) {
          return 1;
        }

        if (obj1.Title.toLowerCase() < obj2.Title.toLowerCase()) {
          return -1;
        }

        return 0;
      });
    });

    this.cols = [
      { field: 'Title', header: 'Field Display Name', width: '30%', align: 'left' },
      { field: 'FieldType', header: 'Type', width: '11.5%', align: 'center' },
      { field: 'Owner', header: 'Owner', width: '11.5%', align: 'center' },
      { field: 'Definition', header: 'Definition', width: '47%', align: 'left' },
      //{ field: 'PreviousFieldName', header: 'Previous Field Name' },
    ];
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.spinner.hide();

    }, 5000);
  }
}
