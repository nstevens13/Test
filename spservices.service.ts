import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SpservicesService {

  public currentUser: any;
  
  constructor() { }

}
