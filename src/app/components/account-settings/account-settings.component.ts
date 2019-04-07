import {Component} from '@angular/core';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  resetPassword() {
    const user = firebase.auth();
    const userEmail = user.currentUser.email;
    return user.sendPasswordResetEmail(userEmail)
      .then(() => {
        console.log('email was sent');
        return this.snackBar.open(`Лист відправленно на пошту ${userEmail}`, 'Ок', {
          duration: 3000,
        });
      })
      .catch((error) => {
        alert('Помилка: ' + error);
        console.log(error);
      });
  }
  constructor(private snackBar: MatSnackBar) {}
}
