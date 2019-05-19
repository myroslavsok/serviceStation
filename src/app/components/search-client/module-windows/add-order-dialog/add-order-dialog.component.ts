import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent implements OnInit {

  orderDate = '';

  constructor() { }

  ngOnInit() {
  }

  chooseDate(chosenDate) {
    this.orderDate = chosenDate;
  }

  applyDetailsInfo(carDetailsInfo) {
    console.log('[add-order-dialog, applyDetailsInfo]', carDetailsInfo);
  }

}
