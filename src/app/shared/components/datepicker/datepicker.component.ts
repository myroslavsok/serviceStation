import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

// imports for date picker
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {FormControl} from '@angular/forms';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DatepickerComponent implements AfterViewInit {

  @Output() onChooseDate = new EventEmitter<string>();
  @ViewChild('orderDate') orderDate: ElementRef;
  date = new FormControl(moment());

  constructor() { }

  ngAfterViewInit() {
    this.chooseDate();
  }

  chooseDate() {
    const dateValue = this.orderDate.nativeElement.value;
    this.onChooseDate.emit(dateValue);
  }

}
