import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  cancelChangingPassword() {
    this.dialogRef.close();
  }

  restorePassword(emailInput) {
    const email = emailInput.value;
    if (!email) {
      alert('Заповніть форму');
    }
    const user = firebase.auth();
    return user.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email was sent');
        this.cancelChangingPassword();
        return this.snackBar.open(`Лист відправленно на пошту ${email}`, 'Ок', {
          duration: 3000,
        });
      })
      .catch((error) => {
        alert('Помилка: ' + error);
        console.log(error);
      });
  }

}
