// Angular modules
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterPipeModule } from 'ngx-filter-pipe';

// Material design modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// Service
import { СrudDBService } from './shared/services/сrud-d-b.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NgxMaskModule } from 'ngx-mask';

// Components
import { AddClientComponent } from './components/add-client/add-client.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ForgotPasswordDialogComponent } from './components/login/module-windows/forgot-password';
import { EditOrderCardDialogComponent }
        from './components/search-client/module-windows/edit-order-card-dialog/edit-order-card-dialog.component';
import { AddOrderDialogComponent } from './components/search-client/module-windows/add-order-dialog/add-order-dialog.component';
import { DatepickerComponent } from './shared/components/datepicker/datepicker.component';
import { DetailsInputComponent } from './shared/components/details-input/details-input.component';
import { AddDoneWorkComponent } from './shared/components/add-done-work/add-done-work.component';


@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    SearchClientComponent,
    UserNavbarComponent,
    LoginComponent,
    ForgotPasswordDialogComponent,
    AccountSettingsComponent,
    EditOrderCardDialogComponent,
    AddOrderDialogComponent,
    DatepickerComponent,
    DetailsInputComponent,
    AddDoneWorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxMaskModule.forRoot(),
    FilterPipeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatCardModule,
    ScrollingModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule
  ],
  entryComponents: [
    ForgotPasswordDialogComponent,
    EditOrderCardDialogComponent,
    AddOrderDialogComponent
  ],
  providers: [
    СrudDBService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
