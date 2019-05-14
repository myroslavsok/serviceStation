import {Component, NgZone, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {СrudDBService} from '../../shared/services/сrud-d-b.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ForgotPasswordDialogComponent} from '../login/module-windows/forgot-password';
import {EditOrderCardDialogComponent} from './module-windows/edit-order-card-dialog/edit-order-card-dialog.component';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {

  constructor(
    private crudDBService: СrudDBService,
    private snackBar: MatSnackBar,
    private router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {
  }

  clients = [];

  searchValue = {
    carInfo: {
      vinCode: '',
      carNumber: ''
    },
    clientInfo: {
      status: 'open'
    }
  };

  searchBySelectedOptions = [
    {
      value: 'vinCode',
      title: 'Vin-кодом'
    },
    {
      value: 'carNumber',
      title: 'Номером авто'
    }
  ];
  searchBySelected = '';

  clearSearchValue() {
    this.searchValue.carInfo.vinCode = '';
    this.searchValue.carInfo.carNumber = '';
    console.log('[method clearSearchValue]: worked');
  }

  ngOnInit() {
    this.crudDBService.getClientsArr(() => {
      this.clients = this.crudDBService.clients;
      console.log('clients', this.clients);
    });
    this.searchBySelected = 'vinCode';
  }

  changeStatusOfClient(client) {
    const status = client.clientInfo.status;
    if (status === 'closed') {
      client.clientInfo.status = 'open';
    } else {
      client.clientInfo.status = 'closed';
    }
    this.crudDBService
      .closeOpenClientOrder(client);
    this.snackBar.open('Статус замовлення змінено', 'Ок', {
      duration: 2000,
    });
  }

  editOrderCard(orderInfo): void {
    const dialogRef = this.dialog.open(EditOrderCardDialogComponent, {
      width: '600px',
      data: orderInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      // TODO: delete this stuff
      // this.snackBar.open('Картка успішно редагована', 'Ок', {
      //   duration: 2000,
      // });
      // this.animal = result;
    });
  }

  addNewOrder() {
    this.ngZone.run(() => this.router.navigate(['add-client'])).then();
  }

}
