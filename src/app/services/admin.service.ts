import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  blobToView: Blob | any ;
  title : String = '';
  pdfview = false;

  openPDF(blob:Blob,title:String){
    this.blobToView = blob;
    this.title = title ;
    this.pdfview = true;
  }
  closePDF(){
    this.blobToView = null ;
    this.title= '';
    this.pdfview = false;
  }

  constructor(
     private http : HttpClient,
     private _configSer:ConfigService 
     ){}
     
  

  url = this._configSer.url_backend + "/admin/";
  url2 = this._configSer.url_backend + "/";
  getAdminById(id:number) {
    return this.http.get(this.url+"getById/"+id);
  }
  Login(data:any){
    return this.http.post(this.url+"login",data);
  }
  getAllPoste(){
    return this.http.get(this.url2+"poste/getAll");
  }
  getAllRegion(){
    return this.http.get(this.url2+"region/getAll");
  }
  getAllEncadrant(){
    return this.http.get(this.url2+"encadrant/getAll");
  }

  getEncadrantByPoste(id:any){
    return this.http.get(this.url2+'encadrant/getByPoste/'+id);
  }
  getEncadrantById(id : any){
    return this.http.get(this.url2+'encadrant/getById/'+id);
  }
  getStageByPoste(id:any){
    return this.http.get(this.url2+'stage/getByPoste/'+id);
  }
  getStageByEncadrants(id:any){
    return this.http.get(this.url2+'stage/getByEncadrants/'+id);
  }
  getAllCountries(){
    return this.http.get(this.url2+'admin/getAllPays');
  }
  getAllType(){
    return this.http.get(this.url2+'admin/getAllType');
  }
  GenerateFicheRep(data: any ){
    return this.http.post(this.url2+'stage/generateFicheReponse',data,{ responseType: 'blob' })
  }
  GenerateAttestation(data: any ){
    return this.http.post(this.url2+'stage/generateAttestation',data,{ responseType: 'blob' })
  }

}