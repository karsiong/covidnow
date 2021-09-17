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

  constructor(
    public gdata:DatagetService
  ) {
    this.data_loading();
  }

  data_loading(){
    this.gdata.get_totalcase().then(data=>{
      this.totalcase=this.gdata.conv_latestdata(data);
    });
    this.gdata.get_deadcase().then(data=>{
      this.deadcase=this.gdata.conv_latestdata(data);
    });
    this.gdata.get_testcon().then(data=>{
      this.testcon=this.gdata.conv_latestdata(data);
      this.ttestcon=Number(this.testcon[1])+Number(this.testcon[2]);
    });
  }

  doRefresh(event) {
    this.data_loading();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
