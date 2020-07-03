import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

/**
 * @title Dialog Overview
 */
export interface DialogData {
  dt_reel: string;
  dt_theo: string;
  etape: string;
  id: number;
  idcoursier: number;
  num_tournee: string;
  title: string;
}

@Component({
  selector: 'ngx-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  get_missions: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      select: true
    };
    this.get_missions = this.data;
  }

  colonnes = ['id', 'etape', 'dt_reel', 'dt_theo', 'num_tournee'];

  ngOnInit() {
  }

}
