import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { crudDBService } from '../../shared/services/crudDB.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {

  constructor(
    private crudDBService: crudDBService,
    private snackBar: MatSnackBar
  ) {}

  clients = [];

  searchValue = {
    carInfo: {
      vinCode: ''
    },
    clientInfo: {
      status: 'open'
    }
  };

  ngOnInit() {
    this.crudDBService.getClientsArr(() => {
      this.clients = this.crudDBService.clients;
      console.log('clients', this.clients);
    });
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

}
