import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { StagiaireService } from '../../../services/stagiaire.service';

@Component({
  selector: 'app-new-demande',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-demande.component.html',
  styleUrl: './new-demande.component.css'
})
export class NewDemandeComponent implements OnInit {
  @ViewChild('stageForm') stageForm !:NgForm;
  facultatif :any = null;
  O(){
    this.facultatif = true;
    this.choisir = false;
  }
  C(){
    this.facultatif = false
    this.choisir = false;
  }
  regions : any = [];
  async selectRegion(){
    this.regions = await this._adminSer.getAllRegion().toPromise();
  }

  Typedestage : any = [];
  async ngOnInit() {
    this._loginSer.check_login(1);
    await this._loginSer.loadUserData();
    this.Typedestage = await this._adminSer.getAllType().toPromise();
    this.stageForm.setValue({type : 0,lieu_proposee:'',date_debut:'',date_fin:'',fiche_reponse:null,id_region : 0});
    await this.selectRegion();
  }
  file : any;
  Select(event:any){
    this.file = event.target.files[0];
    if (this.file && this.file.type !== 'application/pdf'){
      let data = this.stageForm.value;
      data.fiche_reponse = null
      this.stageForm.setValue(data);
      this.file = null;
    }
  }
  choisir = false;
  onSubmit(){
    if(this.facultatif) return;
    let data = new FormData();
    if(this.facultatif == null){
      this.choisir = true ;
      document.getElementById('obg')?.focus();
      return
    }
    if(this.stageForm.value.type == 0){
      document.getElementById('ty')?.focus();
      return 
    }
    if(  this._stagiaireSer.testAttribute(this.stageForm.value.lieu_proposee,2)){
      document.getElementById('z-t8')?.focus();
      return 
    }
    if(this.stageForm.value.id_region == 0){
      document.getElementById('z-region')?.focus();
      return 
    }
 
    if( !this.stageForm.value.date_debut|| !this.verifDate(this.stageForm.value.date_debut) ){
      document.getElementById('date_debut')?.focus();
      return 
    }
    if( !this.stageForm.value.date_fin || !this.CompareDates(this.stageForm.value.date_fin,this.stageForm.value.date_debut) ){
      document.getElementById('date_fin')?.focus();
      return 
    }
    if(!this.file){
      document.getElementById('fiche_reponse')?.click();
      return
    }

    data.append( 'id_type' , this.stageForm.value.type);
    data.append( 'id_region', this.stageForm.value.id_region )
    data.append( 'lieu_proposee' , this.stageForm.value.lieu_proposee);
    data.append( 'date_debut' , this.stageForm.value.date_debut );
    data.append( 'date_fin' , this.stageForm.value.date_fin );
    data.append( 'file' , this.file);
    data.append( 'id_stagiaire' ,this._loginSer.user.id );
    this._stageSer.AddStage(data)
      .subscribe(
        (res:any)=>{
          if(res.etat){
            this._loginSer.loadUserData();
            this.router.navigate(['/etatstage/'+res.id]);
          }
        }
      )
  }
  constructor(
    private _stageSer : StageService,
    private _loginSer : LoginService,
    private router : Router,
    private _adminSer : AdminService,
    public _stagiaireSer : StagiaireService
    ){}

  verifDate(value:any){
    let dn = new Date().getTime();
    return new Date(value).getTime() > dn 
  }
  CompareDates(value:any,value2:any){
    return new Date(value).getTime() > new Date(value2).getTime();
  }
}
