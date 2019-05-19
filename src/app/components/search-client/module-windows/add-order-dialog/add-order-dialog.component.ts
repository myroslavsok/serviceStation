import { Component } from '@angular/core';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent {

  orderDate = '';
  carDetailsInfo = {};
  workInfo = {};


  constructor() { }

  chooseDate(chosenDate) {
    this.orderDate = chosenDate;
    console.log('[add-order-dialog, chooseDate]', this.chooseDate);
  }

  applyDetailsInfo(carDetailsInfo) {
    this.carDetailsInfo = carDetailsInfo;
    console.log('[add-order-dialog, applyDetailsInfo]', this.carDetailsInfo);
  }

  collectWorkInfo(workInfo) {
    this.workInfo = workInfo;
    console.log('[add-order-dialog, collectWorkInfo]', this.workInfo);
  }

}
