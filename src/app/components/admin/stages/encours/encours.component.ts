import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StageService } from '../../../../services/stage.service';

@Component({
  selector: 'app-encours',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule
  ],
  templateUrl: './encours.component.html',
  styleUrl: './encours.component.css'
})
export class EncoursComponent implements OnInit {
  Stages : any = [];
  async ngOnInit(){
    this.Stages = await this._stageSer.getEncours().toPromise()
  }

  constructor(
    private _stageSer : StageService
  ){}
}
