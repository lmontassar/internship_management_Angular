import { Component, OnInit } from '@angular/core';
import { EtatStageComponent } from '../etat-stage.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [
    TitleCasePipe,
    FormsModule,
    DatePipe,
    FaIconComponent
  ],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css'
})
export class InformationsComponent implements OnInit {
  ter = faCheckCircle
  wait = faClockRotateLeft
  ref = faCircleXmark

  stage : any = null;
  currDate !: Date ;

  ngOnInit(): void {
    this.stage = this.etat.stage;
    this.currDate = new Date();
  }

  obsubmit(){
    this._stageSer.demandeAtt({ id : this.stage.id })
      .subscribe(
        async(res:any) =>{
          if(res.message){
            this.etat.stage = await this._stageSer.getStageById(this.stage.id).toPromise();
            this.stage = this.etat.stage;
          }
        }
      )
  }

  download(){
    this._stageSer.GetFile(this.stage.id_attestation)
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
  constructor(
    private etat : EtatStageComponent,
    private _stageSer : StageService,
    public _loginSer : LoginService
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
