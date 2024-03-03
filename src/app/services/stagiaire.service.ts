import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../models/stage';
import { Bureau } from '../models/bureau';
import { Encadrant } from '../models/encadrant';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {
  constructor(
     private http:HttpClient,
     private _configSer : ConfigService
     ) { }
  url = this._configSer.url_backend + "/stagiaire/";

  /* var stagiaire */
  public stages : any ; 

/*
  public stage : Stage = new Stage();
  public bureau_stage : Bureau = new Bureau();
  public encadrant_stage : Encadrant = new Encadrant();
  public etat = -1 ;
*/
  /* end */

  /* var admin */

  /* end */

  testAttribute( val : any , c :any){
    switch(c){
      case 1 :  return !/^[a-zA-Z\u00C0-\u017F]{2,14}$/.test(String(val)) ; // nom et prenom
      case 2 :  return !/^[A-Za-z0-9 ,']{2,100}$/.test( String(val) ) ; // text
      case 3 :  return !/^[A-Z0-9]{6,15}$/.test( String(val) ); // passport
      case 4 :  return !/^\d{8}$/.test(String(val)); //cin et telephone
      case 5 :  return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(val)); // email
      case 6 :  return !/^[A-Za-z\d?._*-]{8,}$/.test(String(val)); // password
    }
    return true;
  }
  getEtat() {

    return -1 ;
  }
  AddStagiaire( data :any){
    return this.http.post(this.url+"add",data);
  }
  LoginStagiaire(data :any){
    return this.http.post(this.url+"login",data);
  }
  GetStagiaireById(data:any){
    return this.http.get(this.url+"getById/"+data);
  }
  editStagiaire(data:any){
    return this.http.put(this.url +"editStagiaire",data);
  }


}