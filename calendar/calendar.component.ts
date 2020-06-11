import { Component, OnInit, Injectable, AfterContentInit } from '@angular/core';
import { GetCollectionDataService } from './get-collection-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

@Injectable()

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterContentInit {
  collectionData: any = [];
  events: any = [];
  options: any = [];

  constructor(public collectionService: GetCollectionDataService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this.collectionService.getAllData().subscribe((collectionArray: {}) => {
      this.collectionData = collectionArray;

      const collectionDataArray = this.collectionData.d.results;
      let i;

      for (i = 0; i < collectionDataArray.length; i++) {
        collectionDataArray[i].id = collectionDataArray[i].Id;
        if(collectionDataArray[i].CollectionType != null)
        {
          // tslint:disable-next-line: max-line-length
          collectionDataArray[i].title = collectionDataArray[i].Acronym + ' - ' + collectionDataArray[i].MailType + ' - ' + collectionDataArray[i].CollectionType;
        } else {
          collectionDataArray[i].title = collectionDataArray[i].Acronym + ' - ' + collectionDataArray[i].MailType;
        }

        collectionDataArray[i].start = new Date(collectionDataArray[i].Date);
        collectionDataArray[i].end = collectionDataArray[i].Date;
        collectionDataArray[i].qualType = collectionDataArray[i].QualType;
        collectionDataArray[i].collType = collectionDataArray[i].CollectionType;
        collectionDataArray[i].type = collectionDataArray[i].MailType;
        collectionDataArray[i].name = collectionDataArray[i].SurveyName;
        delete collectionDataArray[i].Id;
      }

      this.events = collectionDataArray;

    });

    this.options = {
      plugins: [dayGridPlugin, listPlugin],
      // defaultDate: '2017-02-01',
      header: {
          left: 'prev,next, today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
      },
      editable: false,
      displayEventTime: false,
      eventLimit: true, // for all non-TimeGrid views
      // views: {
      //   timeGrid: {
      //     eventLimit: 3 // adjust to 6 only for timeGridWeek/timeGridDay
      //   }
      // }
    };

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.spinner.hide();

    }, 5000);
  }
  
  print() {
    window.print();
  }
}
