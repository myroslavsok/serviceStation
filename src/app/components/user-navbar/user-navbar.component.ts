import { Component, OnInit } from '@angular/core';
import { authService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor(private authService: authService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
