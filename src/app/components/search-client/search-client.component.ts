import {Component, NgZone, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {СrudDBService} from '../../shared/services/сrud-d-b.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EditOrderCardDialogComponent} from './module-windows/edit-order-card-dialog/edit-order-card-dialog.component';
import {AddOrderDialogComponent} from './module-windows/add-order-dialog/add-order-dialog.component';

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
  ) {}

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
  }

  ngOnInit() {
    this.crudDBService.getClientsArr(() => {
      this.clients = this.crudDBService.clients;
      console.log('found clients', this.clients);
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

  editClientCard(clientInfo): void {
    const dialogRef = this.dialog.open(EditOrderCardDialogComponent, {
      width: '600px',
      data: clientInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      // TODO: delete this stuff
      // this.snackBar.open('Картка успішно редагована', 'Ок', {
      //   duration: 2000,
      // });
      // this.animal = result;
    });
  }

  addOrderToOrderCard(clientInfo) {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px',
      data: clientInfo
    });
  }

  navigateToAddingClient() {
    this.ngZone.run(() => this.router.navigate(['add-client'])).then();
  }

}
