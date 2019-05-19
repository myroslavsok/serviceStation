import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-done-work',
  templateUrl: './add-done-work.component.html',
  styleUrls: ['./add-done-work.component.scss']
})

export class AddDoneWorkComponent {

  @ViewChild('doneWork') doneWork: ElementRef;
  @ViewChild('costOfWork') costOfWork: ElementRef;
  @ViewChild('craftsManName') craftsManName: ElementRef;
  @Output() onCollectWorkInfo = new EventEmitter();

  constructor() { }

  collectWorkInfo() {
    const workInfo = {
      doneWork: this.doneWork.nativeElement.value,
      costOfWork: this.costOfWork.nativeElement.value,
      craftsManName: this.craftsManName.nativeElement.value
    }
    this.onCollectWorkInfo.emit(workInfo);
  }

}
