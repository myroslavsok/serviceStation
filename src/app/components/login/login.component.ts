import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {ForgotPasswordDialogComponent} from './module-windows/forgot-password';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  rememberPassword = false;

  // Login with email and pass
  user = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    const savedCredentials = JSON.parse(localStorage.getItem('ssisc'));
    if (savedCredentials) {
      this.user.email = savedCredentials.email;
      this.user.password = savedCredentials.password;
      this.signInWithEmail();
    }
  }

  signInWithEmail() {
    if (this.rememberPassword) {
      this.saveCredentialsToLocalStorage();
    }
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.ngZone.run(() => this.router.navigate(['search-clients'])).then();
      })
      .catch((err) => {
        alert('error: ' + err);
        console.error('error: ' + err);
      });
  }

  saveCredentialsToLocalStorage() {
    const savedUser = {
      email: this.user.email,
      password: this.user.password
    };
    const userToLS = JSON.stringify(savedUser);
    localStorage.setItem('ssisc', userToLS);
  }

  setTrueFalseForRememberPassword() {
    this.rememberPassword = !this.rememberPassword;
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordDialogComponent, {width: '400px'});
  }

}
