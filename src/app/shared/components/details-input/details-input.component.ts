import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CarDetail} from '../../models/CarDetail';

@Component({
  selector: 'app-details-input',
  templateUrl: './details-input.component.html',
  styleUrls: ['./details-input.component.scss']
})
export class DetailsInputComponent implements OnInit {

  @ViewChild('detailName') detailName: ElementRef;
  @ViewChild('detailCost') detailCost: ElementRef;
  carDetails: Array<CarDetail> = [];
  totalDetailCost = 0;
  @Output() onAddedDetailsInfo = new EventEmitter<any>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.outputDetailsInfo();
  }

  addNewDetail(detailName, detailCost) {
    if (!detailName.value || !detailCost.value) {
      return this.snackBar.open('Вкажіть назву та ціну деталі', 'Зрозуміло', {
        duration: 2000,
      });
    }
    this.carDetails.push({
      id: this.carDetails.length + 1,
      name: detailName.value,
      cost: detailCost.value
    });
    this.calculateTotalDetailCost();
    this.detailName.nativeElement.value = '';
    this.detailCost.nativeElement.value = '';
    this.outputDetailsInfo();
  }

  deleteDetail(carDetailId) {
    this.carDetails = this.carDetails.filter(detail => {
      return (detail.id !== carDetailId);
    });
    this.calculateTotalDetailCost();
    this.outputDetailsInfo();
  }

  calculateTotalDetailCost() {
    let detailCost = 0;
    this.carDetails.forEach(detail => {
      const cost = detail.cost.replace(/\s/g, '');
      detailCost += parseInt(cost, 10);
    });
    this.totalDetailCost = detailCost;
  }

  outputDetailsInfo() {
    const detailsInfo = {
      carDetails: this.carDetails,
      totalDetailCost: this.totalDetailCost
    };
    this.onAddedDetailsInfo.emit(detailsInfo);
  }



}
