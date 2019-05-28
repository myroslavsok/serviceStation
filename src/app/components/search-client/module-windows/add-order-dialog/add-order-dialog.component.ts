import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent {

  orderDate = '';
  carDetailsInfo = {};
  workInfo = {};


  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderInfo
  ) { }

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

  cancelAddingOrder() {
    this.dialogRef.close();
  }

  confirmAddingOrder() {
    console.log('orderInfo', this.orderInfo);
    // this.crudDBService.updateGeneralUserInfo(this.orderInfo);
  }

}
