import { Component } from '@angular/core';
import { DatagetService } from '../dataget/dataget.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  eachstate:String[][]=[];
  each_deadstate:String[][]=[];
  s_update:String="";
  sdead_update:String="";
  segment_change:boolean = true;

  constructor(
    public gdata:DatagetService
  ) {
    this.data_loading();
  }

  data_loading(){
    this.gdata.get_statecase().then(data=>{
      this.eachstate=this.gdata.conv_statecase(data);
      this.s_update=this.eachstate[0][0];
    });

    this.gdata.get_dead_statecase().then(data=>{
      this.each_deadstate=this.gdata.conv_dead_statecase(data);
      this.sdead_update=this.each_deadstate[0][0];
    });
  }

  doRefresh(event) {
    this.data_loading();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  segmentChanged(ev: any) {
    if(ev.detail.value == 1){
      this.segment_change = true;
    }
    else{
      this.segment_change = false;
    }
  }

}
