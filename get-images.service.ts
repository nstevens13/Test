import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    //console.log(body);
    return body || {};
  }

  getImages(): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json;odata=verbose');
    // return this.http.get<MyData>('https://collab.ecm.census.gov/dir/adep/apps/csit/_vti_bin/listdata.svc/SiteConfiguration', {headers});
    // return this.http.get('https://api.openweathermap.org/data/2.5/forecast?id=3362024&APPID=bbcf57969e78d1300a815765b7d587f0');
    return this.http.get('https://uscensus.sharepoint.com/teams/ADEP/apps/csit/_vti_bin/listdata.svc/Images?$filter=Title ne null&$orderby=Name asc',
     { headers })
      .pipe(map(this.extractData));
  }
}
