import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-done-work',
  templateUrl: './add-done-work.component.html',
  styleUrls: ['./add-done-work.component.scss']
})

export class AddDoneWorkComponent implements OnInit {

  @ViewChild('doneWork') doneWork: ElementRef;
  @ViewChild('costOfWork') costOfWork: ElementRef;
  @ViewChild('craftsManName') craftsManName: ElementRef;
  @Output() onCollectWorkInfo = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.collectWorkInfo();
  }

  collectWorkInfo() {
    let workInfo = {
      doneWork: this.doneWork.nativeElement.value,
      costOfWork: this.costOfWork.nativeElement.value,
      craftsManName: this.craftsManName.nativeElement.value
    };
    workInfo = this.setDefaultToEmptyFields(workInfo);
    this.onCollectWorkInfo.emit(workInfo);
  }

  private setDefaultToEmptyFields(workInfo) {
    let costOfWork = workInfo.costOfWork;
    costOfWork = costOfWork.replace(/\s/g, '');
    costOfWork =  parseInt(costOfWork, 10);
    if (isNaN(costOfWork)) {
      costOfWork = 0;
    }
    workInfo.costOfWork = costOfWork;
    if (!workInfo.doneWork.trim()) {
      workInfo.doneWork = 'Не вказано';
    }
    if (!workInfo.craftsManName) {
      workInfo.craftsManName = 'Не вказано';
    }
    return workInfo;
  }

  reset() {
    this.doneWork.nativeElement.value = '';
    this.craftsManName.nativeElement.value = '';
    this.costOfWork.nativeElement.value = '';
  }

}
