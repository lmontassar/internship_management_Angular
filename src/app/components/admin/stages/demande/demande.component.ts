import { Component, OnInit } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent implements OnInit {
  Stages : any = [];
  
  async ngOnInit(){
    this.Stages = await this._stageSer.GetAllDemandeInfo().toPromise();
  }
  
  constructor(
    private _stageSer : StageService
  ){
    
  }

}
