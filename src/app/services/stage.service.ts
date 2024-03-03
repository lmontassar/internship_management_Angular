import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  constructor(
    private http:HttpClient,
    private _configSer: ConfigService
    ) {}
  url2 = this._configSer.url_backend + "/"
  url = this._configSer.url_backend + "/stage/";

  /* stagiaire */
  uploadLettreAff( data :any){
    return this.http.put(this.url+"uploadLettreAff",data);
  }
  getStageByStagiaire(id:any){
    return this.http.get(this.url+"getByStagiaire/"+id);
  }
  AddStage(data:any){
    return this.http.post(this.url+"add",data);
  }
  GetFile(id:any){
    return this.http.get(this.url+'getFile/'+id , { responseType: 'blob' })
  }
  demandeAtt(id:any){
    return this.http.put(this.url+"demandeAtt",id);    
  }
  /* end */

  /* for admin */
  GetAllDemandeInfo(){
    return this.http.get(this.url+"GetAllDemandeInfo");
  }
  getStageById(id:any){
    return this.http.get(this.url+"getById/"+id);
  }

  AccepterStage1(data:any){
    return this.http.put(this.url+"Accepter1",data);  
  }

  sendAttest(data:any){
    return this.http.put(this.url+"sendAttestation",data);  
  }

  async GoToPdf(id : any){
    try{
      let Pdf:any = await this.http.get(this.url+"getpdfById/"+id).toPromise();
      let a = document.createElement('a');
      a.target="_blank";
      a.href = this.url2+ Pdf.link;
      document.body.appendChild(a);
      a.click();
      document.removeChild(a);
      console.log(Pdf)
    }catch(err){
      console.log('error!!')
    }
  }
  /* end */

  editStage(data: any){
    return this.http.put(this.url+"editStage",data);
  }

  getAllStage(){
    return this.http.get(this.url+"getAll");
  }
  getEncours(){
    return this.http.get(this.url+"getEncours");
  }

}