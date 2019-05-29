import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Injectable} from '@angular/core';

// Models
import {Car} from '../models/Car';
import {CarNgListElem} from '../models/CarNgListElem';

@Injectable()
export class СrudDBService {

  private dbPathCars = '/cars';
  private dbPathClients = '/clients';

  carsList: AngularFireList<any> = null;
  cars: Array<Car> = null;

  clientsList: AngularFireList<any> = null;
  clients: Array<any> = null;

  constructor(private firebase: AngularFireDatabase) {
    this.carsList = this.firebase.list(this.dbPathCars);
    this.clientsList = this.firebase.list(this.dbPathClients);
  }

  // CRUD with cars
  addCar(car: CarNgListElem): void {
    // console.log('[Service] car add', car);
    this.carsList
      .push(car)
      .catch(error => this.handleError(error));
  }

  addModelToCar(car: { key: string, models: Array<string> }): void {
    // console.log('[Service] uppdating models', car);
    this.carsList
      .update(car.key, {
        models: car.models
      })
      .catch(error => this.handleError(error));
  }

  getCarsArr(callback) {
    this.carsList.snapshotChanges().subscribe(
      list => {
        this.cars = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
        callback();
      }
    );
  }

  clearCarList(): void {
    this.carsList
      .remove()
      .catch(error => this.handleError(error));
  }

  // CRUD with clients
  getClientsArr(callback) {
    this.clientsList.snapshotChanges().subscribe(
      list => {
        this.clients = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
        callback();
      }
    );
  }

  addClient(client: any) {
    this.clientsList
      .push(client)
      .catch(error => this.handleError(error));
  }

  deleteClient(key) {
    this.clientsList.remove(key).catch(error => this.handleError(error));
  }

  // Updating client info
  updateClientInfo(key, updatedClient) {
    this.firebase.object(this.dbPathClients + `/${key}`)
      .update(updatedClient)
      .catch(error => this.handleError(error));
  }

  closeOpenClientOrder(updatedClient) {
    const key = updatedClient.key;
    this.updateClientInfo(key, updatedClient);
    console.log('clients after open-close', this.clients);
  }

  updateGeneralUserInfo(updatedClient): void {
    const key = updatedClient.key;
    this.updateClientInfo(key, updatedClient);
  }

  addNewOrderToClientHistory(clientWithNewOrdeer): void {
    const key  = clientWithNewOrdeer.key;
    this.updateClientInfo(key, clientWithNewOrdeer);
  }

  addNewOrder(): void {
    alert('Works');
  }

  private handleError(error) {
    console.log(error);
    alert('Помилка на сервері (тех підтримка beztormoza@ukr.net): ' + error);
  }

}
