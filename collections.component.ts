import { Component, OnInit } from '@angular/core';
import { GetCollectionDataService } from './get-collection-data.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collectionData: any = [];
  chartArray: any = [];
  data: any;
  options: any;
  dueDates: any = [];
  dueDateReminder: any = [];
  finalCloseout: any = [];
  followUp: any = [];
  inboundTQA: any = [];
  inital: any = [];
  telephoneFollowUp: any = [];

  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  chartColors = {
    blue: 'rgba(70, 184, 218, .9)',
    darkBlue: 'rgba(43, 62, 80, .9)',
    green: 'rgba(76, 174, 76, .9)',
    greyLight: 'rgba(156, 170, 183, .9)',
    orange: 'rgba(223, 105, 26, .9)',
    purple: 'rgb(153, 102, 255)',
    red: 'rgba(212, 63, 58, .9)',
    yellow: 'rgba(238, 162, 54, .9)',
    white: 'rgba(255, 255, 255, .9)'
  };

  constructor(public collectionService: GetCollectionDataService, public chart: ChartModule) {

    this.collectionService.getAllData().subscribe((collectionArray: {}) => {
      this.collectionData = collectionArray;

      // console.log(this.collectionData.d.results);
      const collectionDataArray = this.collectionData.d.results;

      collectionDataArray.sort((obj1, obj2) => {
        if (obj1.MailType === null) {
          obj1.MailType = '';
        }

        if (obj2.MailType === null) {
          obj2.MailType = '';
        }

        if (obj1.MailType.toLowerCase() > obj2.MailType.toLowerCase()) {
          return 1;
        }

        if (obj1.MailType.toLowerCase() < obj2.MailType.toLowerCase()) {
          return -1;
        }
        return 0;
      });


      collectionDataArray.forEach((elementVal, i) => {
        // console.log(elementVal.MailType);

        if (elementVal.MailType === 'Due Date') {
          this.dueDates.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Due Date Reminder') {
          this.dueDateReminder.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Final Closeout') {
          this.finalCloseout.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Follow-Up') {
          this.followUp.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Inbound TQA') {
          this.inboundTQA.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Initial') {
          this.inital.push(new Date(elementVal.Date).getMonth());
        } else if (elementVal.MailType === 'Telephone Follow-Up') {
          this.telephoneFollowUp.push(new Date(elementVal.Date).getMonth());
        }

      });


      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Due Date',
          backgroundColor: this.chartColors.white,
          data: [
            this.getCounts(this.dueDates, 0),
            this.getCounts(this.dueDates, 1),
            this.getCounts(this.dueDates, 2),
            this.getCounts(this.dueDates, 3),
            this.getCounts(this.dueDates, 4),
            this.getCounts(this.dueDates, 5),
            this.getCounts(this.dueDates, 6),
            this.getCounts(this.dueDates, 7),
            this.getCounts(this.dueDates, 8),
            this.getCounts(this.dueDates, 9),
            this.getCounts(this.dueDates, 10),
            this.getCounts(this.dueDates, 11)
          ]
        }, {
          label: 'Due Date Reminders',
          backgroundColor: this.chartColors.blue,
          data: [
            this.getCounts(this.dueDateReminder, 0),
            this.getCounts(this.dueDateReminder, 1),
            this.getCounts(this.dueDateReminder, 2),
            this.getCounts(this.dueDateReminder, 3),
            this.getCounts(this.dueDateReminder, 4),
            this.getCounts(this.dueDateReminder, 5),
            this.getCounts(this.dueDateReminder, 6),
            this.getCounts(this.dueDateReminder, 7),
            this.getCounts(this.dueDateReminder, 8),
            this.getCounts(this.dueDateReminder, 9),
            this.getCounts(this.dueDateReminder, 10),
            this.getCounts(this.dueDateReminder, 11)
          ]
        }, {
          label: 'Final Closeout',
          backgroundColor: this.chartColors.orange,
          data: [
            this.getCounts(this.finalCloseout, 0),
            this.getCounts(this.finalCloseout, 1),
            this.getCounts(this.finalCloseout, 2),
            this.getCounts(this.finalCloseout, 3),
            this.getCounts(this.finalCloseout, 4),
            this.getCounts(this.finalCloseout, 5),
            this.getCounts(this.finalCloseout, 6),
            this.getCounts(this.finalCloseout, 7),
            this.getCounts(this.finalCloseout, 8),
            this.getCounts(this.finalCloseout, 9),
            this.getCounts(this.finalCloseout, 10),
            this.getCounts(this.finalCloseout, 11)
          ]
        }, {
          label: 'Follow-Up',
          backgroundColor: this.chartColors.green,
          data: [
            this.getCounts(this.followUp, 0),
            this.getCounts(this.followUp, 1),
            this.getCounts(this.followUp, 2),
            this.getCounts(this.followUp, 3),
            this.getCounts(this.followUp, 4),
            this.getCounts(this.followUp, 5),
            this.getCounts(this.followUp, 6),
            this.getCounts(this.followUp, 7),
            this.getCounts(this.followUp, 8),
            this.getCounts(this.followUp, 9),
            this.getCounts(this.followUp, 10),
            this.getCounts(this.followUp, 11)
          ]
        }, {
          label: 'Inbound TQA',
          backgroundColor: this.chartColors.darkBlue,
          data: [
            this.getCounts(this.inboundTQA, 0),
            this.getCounts(this.inboundTQA, 1),
            this.getCounts(this.inboundTQA, 2),
            this.getCounts(this.inboundTQA, 3),
            this.getCounts(this.inboundTQA, 4),
            this.getCounts(this.inboundTQA, 5),
            this.getCounts(this.inboundTQA, 6),
            this.getCounts(this.inboundTQA, 7),
            this.getCounts(this.inboundTQA, 8),
            this.getCounts(this.inboundTQA, 9),
            this.getCounts(this.inboundTQA, 10),
            this.getCounts(this.inboundTQA, 11)
          ]
        }, {
          label: 'Initial',
          backgroundColor: this.chartColors.red,
          data: [
            this.getCounts(this.inital, 0),
            this.getCounts(this.inital, 1),
            this.getCounts(this.inital, 2),
            this.getCounts(this.inital, 3),
            this.getCounts(this.inital, 4),
            this.getCounts(this.inital, 5),
            this.getCounts(this.inital, 6),
            this.getCounts(this.inital, 7),
            this.getCounts(this.inital, 8),
            this.getCounts(this.inital, 9),
            this.getCounts(this.inital, 10),
            this.getCounts(this.inital, 11)
          ]
        }, {
          label: 'Telephone Follow-Up',
          backgroundColor: this.chartColors.yellow,
          data: [
            this.getCounts(this.telephoneFollowUp, 0),
            this.getCounts(this.telephoneFollowUp, 1),
            this.getCounts(this.telephoneFollowUp, 2),
            this.getCounts(this.telephoneFollowUp, 3),
            this.getCounts(this.telephoneFollowUp, 4),
            this.getCounts(this.telephoneFollowUp, 5),
            this.getCounts(this.telephoneFollowUp, 6),
            this.getCounts(this.telephoneFollowUp, 7),
            this.getCounts(this.telephoneFollowUp, 8),
            this.getCounts(this.telephoneFollowUp, 9),
            this.getCounts(this.telephoneFollowUp, 10),
            this.getCounts(this.telephoneFollowUp, 11)
          ]
        }]

      };

      this.options = {
        title: {
          display: false,
          text: 'My Title',
          fontSize: 16,
          fontColor: 'rgba(255, 255, 255, .9)'
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: 'rgba(255, 255, 255, .9)',
            fontSize: 15
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              fontColor: 'rgba(255, 255, 255, .9)',
              fontSize: 15
            },
            gridLines: {
              color: 'rgba(255, 255, 255, .2)',
              zeroLineColor: 'rgba(255, 255, 255, .2)'
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              fontColor: 'rgba(255, 255, 255, .9)',
              fontSize: 15
            },
            gridLines: {
              color: 'rgba(255, 255, 255, .2)',
              zeroLineColor: 'rgba(255, 255, 255, .2)'
            }
          }],
        }
      };

    });
  }

  ngOnInit() {
    // alert();

    // console.log(this.dueDates.length);



  }

  getCounts(thisArray, month) {
    console.log(thisArray.length, month);

    let count = 0;

    thisArray.forEach(e => {
      if (e === month) {
        count++;
      }
    });

    return count;
  }

  randomScalingFactor() {
    return Math.round(Math.random() * 256);
  }

  update(event: Event) {
    // this.data = //create new data
  }

  onSelect(event) {
    console.log(event);
  }

}
