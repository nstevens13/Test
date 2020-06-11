import { Component, OnInit, AfterContentInit } from '@angular/core';
import { GetImagesService } from './get-images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landing-body',
  templateUrl: './landing-body.component.html',
  styleUrls: ['./landing-body.component.css']
})
export class LandingBodyComponent implements OnInit, AfterContentInit {

  title = 'Census Survey Information Tool';
  images: any = [];
  display: any = false;
  comments: any = '';

  constructor(private spinner: NgxSpinnerService, public getImageInfo: GetImagesService, public router: Router) {
    this.spinner.show();
   }

  ngOnInit() {
    this.spinner.show();

    this.images = [];
    this.getImageInfo.getImages().subscribe((response: {}) => {
      this.images = response;
      // console.log(this.images);
    });

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  openPDF(clickUrl) {
    if (clickUrl) {
      window.open(clickUrl);
    }
  }

  showDialog(item) {
    // console.log(item);
    this.comments = item.Comments;
    this.display = true;
  }

  goToInventory() {
    this.router.navigate(['/surveyInventory']);
  }
}

