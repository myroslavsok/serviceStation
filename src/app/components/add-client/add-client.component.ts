import { СrudDBService } from '../../shared/services/сrud-d-b.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {

  constructor(private crudDBService: СrudDBService,
              private snackBar: MatSnackBar) { }

  marqueControl = new FormControl();
  modelControl = new FormControl();

  filteredOptionsMarque: Observable<string[]>;
  filteredOptionsModel: Observable<string[]>;

  @ViewChild('carMarque') carMarque: ElementRef;
  orderDate;
  workInfo;
  carDetailsInfo;

  ngOnInit() {
    this.crudDBService.getCarsArr(() => {
      this.filteredOptionsMarque = this.marqueControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMarque(value))
        );
    });
  }

  private _filterMarque(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.filteredOptionsModel = this.modelControl.valueChanges
        .pipe(
          startWith(''),
          map(element => this._filterModel(element))
        );
    return this.crudDBService.cars
      .map(item => item.marque)
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterModel(value: string): string[] {
    const filterValue = value.toLowerCase();
    const carMarque = this.carMarque.nativeElement.value;
    let carModelsArr = [];
    this.crudDBService.cars
      .forEach(item => {
        if (item.marque === carMarque) {
          carModelsArr = item.models;
        }
      });
    return carModelsArr
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  addCarToDBIfNotExists(marque, model) {
    if (!marque || !model) {
      return;
    }
    let isCarMarqueNew__key = '';
    let isCarModelNew = false;
    this.crudDBService.cars.forEach(item => {
      if (item.marque === marque) {
        isCarMarqueNew__key = item.key;
        item.models.forEach(elem => {
          if (elem === model) {
            isCarModelNew = true;
          }
        });
      }
    });
    if (isCarMarqueNew__key && isCarModelNew) {
      // console.log('assign car to client');
    } else if (isCarMarqueNew__key && !isCarModelNew) {
      // console.log('adding model to', isCarMarqueNew__key);
      let existingModels = [];
      this.crudDBService.cars
        .forEach(item => {
          if (item.key === isCarMarqueNew__key) {
            existingModels = item.models;
          }
        });
      existingModels.push(model);
      this.crudDBService.addModelToCar({
        key: isCarMarqueNew__key,
        model: existingModels
      });
    } else if (!isCarMarqueNew__key) {
      this.crudDBService.addCar({
        marque: marque,
        model: [model]
      });
    }
  }

  chooseDate(chosenDate) {
    this.orderDate = chosenDate;
  }

  collectWorkInfo(workInfo) {
    this.workInfo = workInfo;
    console.log('workInfo', this.workInfo);
  }

  applyDetailsInfo(carDetailsInfo) {
    this.carDetailsInfo = carDetailsInfo;
    console.log('carDetailsInfo', this.carDetailsInfo);
  }

  addClient(addClientForm) {
    if (!addClientForm.valid) {
      return this.snackBar.open(`Поле "Vin-код" є обов'язковим`, 'Ок', {
        duration: 2000,
      });
    }
    console.log('form', addClientForm);
    let client = this.createClient(addClientForm);
    console.log('client', client);
    // this.addCarToDBIfNotExists(client.carInfo.marque, client.carInfo.model);
    // client = this.setDefaultValuesForEmptyFormFields(client);
    // this.clearFormAndFiledValues(addClientForm);
    // console.log('[add-client] client = ', client);
    // try {
    //   this.crudDBService.addClient(client);
    //   this.snackBar.open('Клієнт успішно доданий до бази', 'Ок', {
    //     duration: 2000,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return alert('Помилка при спробі додати інформацію про замовлення клієнта: ' + error + ' Спробуйте заповнити усі поля');
    // }
  }

  createClient(form) {
    const client = {
      clientInfo: form.value.clientInfo,
      carInfo: form.value.carInfo,
      orders: [{
        orderDate: this.orderDate,
        carDetailsInfo: this.carDetailsInfo,
        workInfo: this.workInfo,
        totalCost: 0
      }]
    };
    client.carInfo.marque = this.marqueControl.value;
    client.carInfo.model = this.modelControl.value;
    client.orders[0].totalCost = +client.orders[0].workInfo.costOfWork + +client.orders[0].carDetailsInfo.totalDetailCost;
    client.clientInfo.status = 'open';
    return client;

    // const client = {
    //   clientInfo: form.value.clientInfo,
    //   carInfo: form.value.carInfo,
    //   workInfo: form.value.workInfo
    // };
    // client.clientInfo.date = this.orderDate;
    // client.carInfo.marque = this.marqueControl.value;
    // client.carInfo.model = this.modelControl.value;
    // if (!client.workInfo.workCost) {
    //   client.workInfo.workCost = 0;
    // }
    // client.workInfo.totalCost = +client.workInfo.workCost + +client.workInfo.detailCost;
    // client.clientInfo.status = 'open';
    // return client;
  }

  setDefaultValuesForEmptyFormFields(client) {
    for (let categoryKey in client) {
      for (let key in client[categoryKey]) {
        if (key !== 'workCost' && key !== 'detailCost' && key !== 'totalCost' && key !== 'details') {
          if (!client[categoryKey][key]) {
            client[categoryKey][key] = 'Не вказано';
          }
        }
      }
    }
    console.log('Set defaults client', client);
    return client;
  }

  clearFormAndFiledValues(form) {
    form.reset();
    this.marqueControl.setValue('');
    this.modelControl.setValue('');
  }

}
