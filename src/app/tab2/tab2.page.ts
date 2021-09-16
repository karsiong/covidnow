import { Component } from '@angular/core';
import { DatagetService } from '../dataget/dataget.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  eachstate:String[][]=[];
  s_update:String="";

  constructor(
    public gdata:DatagetService
  ) {
    gdata.get_statecase().then(data=>{
      this.eachstate=this.gdata.conv_statecase(data);
      this.s_update=this.eachstate[0][0];
      console.log(this.eachstate)
    });
  }

}
