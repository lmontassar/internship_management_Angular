import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StagiaireService } from './stagiaire.service';
import { JsonPipe } from '@angular/common';
import { StageService } from './stage.service';
import { Stage } from '../models/stage';
import { EncadrantService } from './encadrant.service';
import { BureauService } from './bureau.service';
import { Bureau } from '../models/bureau';
import { Encadrant } from '../models/encadrant';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any = null;
  type: any = null;

  public async loadUserData() {
    if (localStorage.getItem('token')) {
      let data = this.getUserDataFromToken();
      if (data) {
        if ( data.usertype == 0 ) { // stagiaire
          try{
            this.user = await this._stagiaireSer.GetStagiaireById(data._id).toPromise();
          }catch{
            this.logout();
          }
          this.type = 0;
          this._stagiaireSer.stages = await this._stageSer.getStageByStagiaire( data._id ).toPromise();
        }else if(data.usertype == 1){ // admin
          this.user = await this._adminSer.getAdminById(data._id).toPromise();
          this.type = 1;
        }
      }
    }
  }

  /* check login redirect to another page 
    // 0-> check from login/inscription
    // 1-> check from stagiaire
    // 2-> check from admin

  */
  public async check_login(type : any){ 
    
    let data = this.getUserDataFromToken();
    switch (type){
      case 0 :{ // ( Inscription - Login ) pages
        if(data){
          if(data.usertype == 0) this.router.navigate(['/liste']);
          else if(data.usertype == 1) this.router.navigate(['/stageAd']);

          else this.logout();
        }
        break;
      }
      case 1 :{ // ( Stagiaire ) pages
        if(!data) this.router.navigate(['/login']);
        else if( data.usertype == 1 ) this.router.navigate(['/stageAd']); // if admin

        else if( data.usertype != 0 ) {
          this.router.navigate(['/login']);
          this.logout();
        }
        break;
      } 
      case 2 :{ // ( admin ) pages
        if(!data) this.router.navigate(['/login']);
        else if(data.usertype == 0 ) this.router.navigate(['/liste']);

        else if( data.usertype != 1 ) {
          this.router.navigate(['/login']);
          this.logout();
        }
        break
      }
    }
  }
  
  public logout(){
    localStorage.clear();
    this.user = null;
    this.type = null;
  }

  public getUserDataFromToken(): any {
    let tk = localStorage.getItem('token');
    if (tk) {
      try {
        let data = jwtDecode(tk);
        return data;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  constructor(
    private _stagiaireSer: StagiaireService,
    private _stageSer : StageService,
    private _adminSer : AdminService,
    private router : Router
    ) { }
}
