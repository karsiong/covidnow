import { Component } from '@angular/core';
import { DatagetService } from '../dataget/dataget.service'
import { ActionSheetController } from '@ionic/angular';

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
    public gdata:DatagetService,
    public actionSheetController:ActionSheetController
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
    }, 1000);
  }

  async lang_selector() {
    const actionSheet = await this.actionSheetController.create({
      header: this.gdata.lang_p1,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'EN-ENGLISH',
        icon: 'language-sharp',
        handler: () => {
          this.gdata.change_lang('EN');
        }
      }, {
        text: 'BM-BAHASA MALAYSIA',
        icon: 'language-sharp',
        handler: () => {
          this.gdata.change_lang('BM');
        }
      }, {
        text: 'CH-中文',
        icon: 'language-sharp',
        handler: () => {
          this.gdata.change_lang('CH');
        }
      },{
        text: this.gdata.lang_p2,
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
