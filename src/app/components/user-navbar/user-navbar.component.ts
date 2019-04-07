import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    localStorage.removeItem('ssisc');
  }

}
