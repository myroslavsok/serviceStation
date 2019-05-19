import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {СrudDBService} from '../../../../shared/services/сrud-d-b.service';


@Component({
  selector: 'app-edit-order-card-dialog',
  templateUrl: './edit-order-card-dialog.component.html',
  styleUrls: ['./edit-order-card-dialog.component.scss']
})
export class EditOrderCardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditOrderCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderInfo,
    private crudDBService: СrudDBService,
  ) { }

  cancelEditingCard() {
    this.dialogRef.close();
  }

  confirmEditing() {
    console.log('orderInfo', this.orderInfo);
    this.crudDBService.updateGeneralUserInfo(this.orderInfo);
  }

}
