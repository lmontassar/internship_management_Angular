import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor(
    private http : HttpClient,
    private _configSer : ConfigService
    ) { }
  url = this._configSer.url_backend + "/poste/";
  getPosteById(id:any){
    return this.http.get(this.url+"getById/"+id);
  }
}
