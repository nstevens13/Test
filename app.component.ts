import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpservicesService } from 'src/app/spservices.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Census Survey Information Tool';
  user = '';
  // sectionData: object;
  constructor(private spinner: NgxSpinnerService, private http: HttpClient, public thisUser: SpservicesService) {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.show();
    // { "Accept": "application/json;odata=verbose" }
    // const headers = new HttpHeaders().set();
    // const headers = new HttpHeaders().set('Accept', 'application/json;odata=verbose');
    // const obs = this.http.get('https://collab.ecm.census.gov/dir/adep/apps/csit/_vti_bin/listdata.svc/SiteConfiguration', {headers});
    // obs.subscribe((response) => this.sectionData = response);

    this.user = $().SPServices.SPGetCurrentUser({
      fieldName: 'EMail',
      debug: false
    });

     // console.log(this.user);

    this.thisUser.currentUser = this.user;

    // alert(this.user);

  }



}
