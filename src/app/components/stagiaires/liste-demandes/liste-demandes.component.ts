import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { StageService } from '../../../services/stage.service';
import { DatePipe } from '@angular/common';
import { StagiaireService } from '../../../services/stagiaire.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-liste-demandes',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe
  ],
  templateUrl: './liste-demandes.component.html',
  styleUrl: './liste-demandes.component.css'
})
export class ListeDemandesComponent implements OnInit {
  Stages : any = [] 
  async ngOnInit() {
    this._loginSer.check_login(1);
    await this._loginSer.loadUserData();
    this.Stages = this._stagiaireSer.stages ;
  }
  constructor(
    private _loginSer : LoginService,
    private _stageSer : StageService,
    private _stagiaireSer : StagiaireService
  ){}

  enstage( DD :any, DF : any ){
    let dn = new Date().getTime()
    let d1 = new Date(DD).getTime();
    let d2 = new Date(DF).getTime();
    return (d1<dn && dn< d2);
  }
  afterstage( DF : any){
    let dn = new Date().getTime();
    let d2 = new Date(DF).getTime();
    return ( dn > d2);
  }
}