import { Component } from '@angular/core';
import { DatagetService } from '../dataget/dataget.service'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  totalcase:String[]=[];
  deadcase:String[]=[];
  testcon:String[]=[];
  ttestcon:number=0;
  ttodayactive:number=0;

  constructor(
    public gdata:DatagetService
  ) {
    gdata.get_totalcase().then(data=>{
      this.totalcase=gdata.conv_latestdata(data);
      this.ttodayactive=Number(this.totalcase[1])+Number(this.totalcase[2]);
    });
    gdata.get_deadcase().then(data=>{
      this.deadcase=gdata.conv_latestdata(data);
    });
    gdata.get_testcon().then(data=>{
      this.testcon=gdata.conv_latestdata(data);
      this.ttestcon=Number(this.testcon[1])+Number(this.testcon[2]);
    });
  }

}
