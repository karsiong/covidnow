import { Component } from '@angular/core';
import { DatagetService } from './dataget/dataget.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private gdata : DatagetService
  ) {}
}
