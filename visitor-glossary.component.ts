import { Component, OnInit, Injectable, AfterContentInit } from '@angular/core';
import { GetglossarydataService } from './getglossarydata.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()

@Component({
  selector: 'app-visitor-glossary',
  templateUrl: './visitor-glossary.component.html',
  styleUrls: ['./visitor-glossary.component.css']
})
export class VisitorGlossaryComponent implements OnInit, AfterContentInit {

  glossaryData: any = [];
  selectedData: any = [];
  cols: any[];

  constructor(public getGlossaryInfo: GetglossarydataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.glossaryData = [];
    this.getGlossaryInfo.getGlossaryData().subscribe((response: {}) => {
      this.glossaryData = response;

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
      { field: 'Title', header: 'Field Display Name', width: '25%', align: 'left' },
      { field: 'Definition', header: 'Definition', width: '75%', align: 'left' },
    ];
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.spinner.hide();

    }, 5000);
  }


}
