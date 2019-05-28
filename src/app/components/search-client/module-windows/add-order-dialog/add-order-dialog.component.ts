import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {СrudDBService} from '../../../../shared/services/сrud-d-b.service';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent {

  newOrder = {} as any;

  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public clientInfo,
    private crudDBService: СrudDBService,
  ) { }

  @ViewChild('doneWorkComponent') doneWorkComponent;
  @ViewChild('carDetailsComponent') carDetailsComponent;

  chooseDate(chosenDate) {
    this.newOrder.orderDate = chosenDate;
  }

  applyDetailsInfo(carDetailsInfo) {
    this.newOrder.carDetailsInfo = carDetailsInfo;
  }

  collectWorkInfo(workInfo) {
    this.newOrder.workInfo = workInfo;
  }

  confirmAddingOrder() {
    this.newOrder.totalCost = this.newOrder.workInfo.costOfWork + this.newOrder.carDetailsInfo.totalDetailCost;
    this.clientInfo.orders.push(this.newOrder);
    this.crudDBService.addNewOrderToClientHistory(this.clientInfo);
    this.doneWorkComponent.reset();
    this.carDetailsComponent.reset();
    console.log('clientInfo', this.clientInfo);
  }

  cancelAddingOrder() {
    this.dialogRef.close();
  }

}
