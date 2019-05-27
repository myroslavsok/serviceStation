import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {СrudDBService} from '../../../../shared/services/сrud-d-b.service';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent {

  newOrder: OrderInfo = {} as any;

  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public clientInfo,
    private crudDBService: СrudDBService,
  ) { }

  chooseDate(chosenDate) {
    this.newOrder.orderDate = chosenDate;
  }

  applyDetailsInfo(carDetailsInfo) {
    this.newOrder.carInfo = carDetailsInfo;
  }

  collectWorkInfo(workInfo) {
    this.newOrder.workInfo = workInfo;
  }

  cancelAddingOrder() {
    this.dialogRef.close();
  }

  confirmAddingOrder() {
    console.log('add new order modal ', this.newOrder);
    this.crudDBService.addNewOrder(this.clientInfo.key, this.newOrder);
    this.dialogRef.close();
  }

}
