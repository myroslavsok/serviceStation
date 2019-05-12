import {Component, NgZone, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {СrudDBService} from '../../shared/services/сrud-d-b.service';
import {Router} from '@angular/router';

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
    private ngZone: NgZone
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

  addNewOrder() {
    this.ngZone.run(() => this.router.navigate(['add-client'])).then();
  }

}
