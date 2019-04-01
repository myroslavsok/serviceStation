import { Injectable } from '@angular/core';
import { authService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: authService) { }

  canActivate() {
    if ( this.authService.isLoggedIn() ) {
        return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
