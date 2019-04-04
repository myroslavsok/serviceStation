import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit {

  // Login with email and pass
  user = {
    email: 'beztormoza@ukr.net',
    password: '123456'
  };

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['add-client']);
      })
      .catch((err) => {
        alert('error: ' + err);
        console.log('error: ' + err);
      });
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone) {}

  ngOnInit() {}

  // Login with google
  // signInWithGoogle() {
  //   this.authService.signInWithGoogle()
  //   .then(res => {
  //       // this.router.navigate(['add-client']);
  //       // ngZone.run();
  //       this.ngZone.run(() => this.router.navigate(['add-client'])).then();
  //     })
  //   .catch(err => console.log(err));
  // }

}
