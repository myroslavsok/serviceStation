import { Component, OnInit } from '@angular/core';

// import { СrudDBService } from './services/crudDB.service';
import { СrudDBService } from './shared/services/сrud-d-b.service';
import { AuthService } from './shared/services/auth.service';
// import { map } from 'rxjs/operators';

// Models
// import { Car } from './shared/models/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private crudDBService: СrudDBService,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

  // cars: Array<Car>;


  ngOnInit() {
    // this.getCarsList();

    // To delete
    // this.addCars();
  }


  // addCars(): void {
  //   this.СrudDBService.addCar({
  //     marque: 'Acura',
  //     model: ['CL', 'EL', 'Integra', 'DX', 'NSX', 'RDX', 'RL', 'RSX', 'TL', 'TSX' ]
  //   });
  //   this.СrudDBService.addCar({
  //     marque: 'Alfa Romeo',
  //     model: ['33', '75', '145', '146', '147', '155', '156', '159', '164', '166', 'Alfetta', 'Brera', 'GT', 'GTV', 'Giulietta', 'Spider']
  //   });
  // }

  // addCar(name, year) {
  //   this.СrudDBService.addCar({
  //     name: name.value,
  //     year: year.value
  //   });
  //   name.value = '';
  //   year.value = '';
  // }

  // getCars() {
  //   console.log('crud', this.cars);
  // }

  // deleteCars() {
  //   this.СrudDBService.clearCarList();
  // }
}


