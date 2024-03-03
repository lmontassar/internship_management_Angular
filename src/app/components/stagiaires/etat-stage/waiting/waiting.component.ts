import { Component, OnInit, ViewChild } from '@angular/core';
import { EtatStageComponent } from '../etat-stage.component';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../../services/stagiaire.service';
import { LoginService } from '../../../../services/login.service';
import { StageService } from '../../../../services/stage.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    FaIconComponent
  ],
  templateUrl: './waiting.component.html',
  styleUrl: './waiting.component.css'
})
export class WaitingComponent implements OnInit {
  ter = faCheckCircle
  wait = faClockRotateLeft
  ref = faCircleXmark

  stage : any = null;
  ngOnInit(): void {
    setTimeout( ()=>{
      this.stage = this.etat.stage
    });
  }
  constructor(
    private etat : EtatStageComponent,
    private _stagiaireSer : StagiaireService,
    private _stageSer : StageService,
    private _loginSer : LoginService
  ){
  }
  @ViewChild('fform') fform !:NgForm;
  file : any;
  Select(event:any){
    this.file = event.target.files[0];
    if (this.file && this.file.type != 'application/pdf'){
      this.fform.reset();
    }
  }
  onSubmit(){  

    if (this.file && this.file.type == 'application/pdf' ){
      let data = new FormData();
      data.append('file', this.file);
      data.append('id', String(this.stage.id) );
      this._stageSer.uploadLettreAff(data)
        .subscribe(
          async(res:any)=>{
            if(res.etat){
              this.etat.stage = await this._stageSer.getStageById(this.stage.id).toPromise();
            }
          }
        )
    } else {
        this.fform.setValue( {lettre_affectation:null} );
        this.file = null;
        document.getElementById('lettre_affectation')?.click();
    }
}

download(){
  this._stageSer.GetFile(this.stage.id_fiche_reponse_signe)
    .subscribe(
      (blob:any)=>{
        let blob1 = new Blob([blob] ,{ type:"application/pdf"});
        let url = window.URL.createObjectURL(blob1);
        let a = document.createElement("a");
        a.href = url;
        a.download = 'fiche_reponse.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    )
  }

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
