import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private http : HttpClient,
    private _configSer : ConfigService
  ) { }
  url = this._configSer.url_backend + "/region/";
  getById(id:any){
    return this.http.get(this.url+"getById/"+id);
  }
  getAll(){
    return this.http.get(this.url+"getAll");
  }
  
}
