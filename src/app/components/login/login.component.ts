import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from '../../shared/services/auth.service';




@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: authService,
    private ngZone: NgZone) {}

  ngOnInit() {}

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then(res => {
        // this.router.navigate(['add-client']);
        // ngZone.run();
        this.ngZone.run(() => this.router.navigate(['add-client'])).then();
      })
    .catch(err => console.log(err));
  }

}
