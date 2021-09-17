import { Component } from '@angular/core';
import { DatagetService } from '../dataget/dataget.service'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public gdata:DatagetService
  ) {}

}
