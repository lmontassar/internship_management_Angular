import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { StagiaireService } from '../../../services/stagiaire.service';
import { StageService } from '../../../services/stage.service';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ReponsePdfComponent } from '../reponse-pdf/reponse-pdf.component';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { AttestationPdfComponent } from '../attestation-pdf/attestation-pdf.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faPaperPlane, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [
    FaIconComponent,
    ViewPdfComponent,
    DatePipe,
    FormsModule,
    ReponsePdfComponent,
    AttestationPdfComponent
  ],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent implements OnInit {
  pen = faPen
  ref = faXmarkCircle 
  acc = faCheckCircle
  paper = faPaperPlane

  constructor(
    private _loginSer : LoginService,
    public _stageSer : StageService,
    public _adminSer: AdminService,
    private route : ActivatedRoute
  ){}
  async ShowPDF( id:number ,msg : string){
    let res = await this._stageSer.GetFile(id).toPromise();
    if(res!=null){
      let b = new Blob([res], { type: 'application/pdf' });
      this._adminSer.openPDF(b,msg)
    }
  }
  stage : any ;
  posteAll : any ;
  regionAll : any ;
  encadrantAll : any ;
  postefiltred : any ;
  regionfiltred : any ;
  encadrantfiltred : any ;
  regionSelected : any ;
  posteSelected :any = null;
  encadrantSelected : any = null ;
  notFound = false;
  regionSelect !: HTMLSelectElement;
  posteSelect !: HTMLSelectElement;
  encadrantSelect !: HTMLSelectElement;

  filterbyRegion(event:any){
    let id = event.target.value;
    this.posteSelected = null ;
    this.encadrantSelected = null;
    this.posteSelect.value = "0";
    this.encadrantSelect.value = "0";
    if(id == 0){
      this.regionSelected = null ; 
      this.postefiltred = this.posteAll;
    } else {
      let ind = this.regionAll.findIndex( (r:any) => r.id == id );
      this.regionSelected = this.regionAll[ind];
      this.postefiltred = this.posteAll.filter( (b:any) => b.region.id == id );
    }
  }
  filterByposte( event : any ){
    let id = event.target.value;
    this.encadrantSelected = null;
    this.encadrantSelect.value = "0";
    if(id == 0){
      this.posteSelected = null ;
      this.encadrantfiltred = this.encadrantAll ;
      return
    }
    let posteIndex = this.posteAll.findIndex( (b:any) => b.id == id);

    this.posteSelected = this.posteAll[posteIndex];
    
    this.regionSelect.value = this.posteAll[posteIndex].region.id ;
    this.encadrantfiltred = this.encadrantAll.filter( (e:any) => e.poste.id == id);
  }

  filterByEncadrant(event : any){
    let id = event.target.value;
    if(id == 0){
      this.encadrantSelected = null
      return
    }
    let EncIndex = this.encadrantAll.findIndex( (e:any) => e.id == id);
    let posteIndex = this.posteAll.findIndex( (b:any) => b.id == this.encadrantAll[EncIndex].poste.id );
    let RegIndex = this.regionAll.findIndex( (r:any) => r.id == this.posteAll[posteIndex].region.id);
    this.encadrantSelected= this.encadrantAll[EncIndex];
    this.regionSelected = this.regionAll[RegIndex];
    this.posteSelected =  this.posteAll[posteIndex];
    setTimeout(()=>{
      this.regionSelect.value = String( this.regionAll[RegIndex].id);
      this.posteSelect.value = String( this.posteAll[posteIndex].id);
    });
  }
  supp1Active:any;
  supp2Active:any;
  waiting = false;
  open_fichereponse = false;
  openfichereponse(){
    this.open_fichereponse = true;
  }
  open_attestation = false;
  openattestation(){
    this.open_attestation = true;
  }
  async ngOnInit() {
    this.open_attestation = false;
    this.open_fichereponse = false;
    this.supp1Active = false;
    this.supp2Active = false
    this.encadrantSelected = null;
    this.posteSelected = null;
    this.regionSelected = null;
    this._loginSer.check_login(2);
    await this._loginSer.loadUserData();
    let id = this.route.snapshot.paramMap.get('id');
    try{
      this.stage = await this._stageSer.getStageById(id).toPromise();
      this.posteAll = await this._adminSer.getAllPoste().toPromise();
      this.regionAll = await this._adminSer.getAllRegion().toPromise();
      this.encadrantAll = await this._adminSer.getAllEncadrant().toPromise();
      this.postefiltred  =   this.posteAll;
      this.regionfiltred  =   this.regionAll;
      this.encadrantfiltred  =  this.encadrantAll;
      this.waiting=true
      if(this.stage.etat >= 0){
        setTimeout( ()=>{
          this.regionSelect = document.getElementById("regionS") as HTMLSelectElement ;
          this.posteSelect = document.getElementById("posteS")  as HTMLSelectElement;
          this.encadrantSelect = document.getElementById("encadrantS") as HTMLSelectElement ;
        });
        if(this.stage.poste){
          let indexB = this.posteAll.findIndex( (b:any) => b.id == this.stage.poste.id );
          let indexR = this.regionAll.findIndex( (r:any) => r.id  == this.posteAll[indexB].region.id);
          this.postefiltred = this.posteAll.filter( (b:any) => b.region.id == this.regionAll[indexR].id );
          this.encadrantfiltred = this.encadrantAll.filter( (e:any) => e.poste.id == this.stage.poste.id);
          this.regionSelected = this.regionAll[indexR];
          this.posteSelected = this.posteAll[indexB];
          setTimeout(() => {
            this.posteSelect.value = String( this.stage.poste.id ) ;
            this.regionSelect.value = String( this.regionAll[indexR].id );
          });
        }
        if(this.stage.encadrant){
          let indexe = this.encadrantAll.findIndex( (e:any)=> e.id == this.stage.encadrant.id);
          this.encadrantSelected = this.encadrantAll[indexe];
          setTimeout(() => {
            this.encadrantSelect.value = String(this.stage.encadrant.id);
          });
        }
      }
      
    } 
    catch(err){
      this.notFound = true;
    }
    if(this.stage.poste == null ) this.stage.poste = {} as any 
    else  this.supp1Active = true;
    if(this.stage.encadrant == null ) this.stage.encadrant = {} as any 
    else  this.supp2Active = true

  }

  async editposteReq(){
    let data = {
      id : this.stage.id,
      id_poste : this.posteSelected.id,
      id_Encadrant : "null",
    } 
    try{
      await this._stageSer.editStage(data).toPromise();
      this.stage.poste = this.posteSelected;
      this.stage.encadrant = {}
      this.supp1Active = true;
    }catch(err){
      this.ngOnInit()
    }
  }
  async editEncadrantReq(){
    let data = {
      id : this.stage.id,
      id_Encadrant : this.encadrantSelected.id,
      id_poste : this.posteSelected.id
    }
    try{
      await this._stageSer.editStage(data).toPromise();
      this.stage.poste = this.posteSelected;
      this.stage.encadrant = this.encadrantSelected;
      this.supp1Active = true;
      this.supp2Active = true;
    }catch(err){
      this.ngOnInit();
    }
  }

  async deleteposte(){
    let data = {
      id : this.stage.id,
      id_poste : "null"
    }
    try{
      await this._stageSer.editStage(data).toPromise();
      await this.deleteEncadrant();
      this.stage.encadrant = {}
      this.stage.poste = {}
      this.posteSelected = null;
      this.encadrantSelected = null;
      this.regionSelect.value = '0'
      this.encadrantSelect.value = '0';
      this.posteSelect.value = '0';
      this.supp1Active = false;
      this.supp2Active = false;
    }catch(err){
      this.ngOnInit()
    }
  }

  async deleteEncadrant(){
    let data = {
      id : this.stage.id,
      id_Encadrant : "null"
    }
    try{
      await this._stageSer.editStage(data).toPromise();
      this.stage.encadrant = {}
      this.encadrantSelect.value = '0';
      this.encadrantSelected = null;
      this.supp2Active = false;
    }catch(err){
      this.ngOnInit()
    }
  }

  @ViewChild('sendFile1') sendf1 !:NgForm;
  file1 : any = null;
  errmsgf1 = false; 
  Select1(event:any){
    this.errmsgf1 = false ;
    this.file1 = event.target.files[0];
    if (this.file1 && this.file1.type != 'application/pdf' ){
      this.sendf1.reset();
      this.file1 = null;
      this.errmsgf1 = true;
      setTimeout(() => {
        this.errmsgf1 = false
      }, 10000);
    }
  }

  async sendAttest(){
    if( !this.file1 || this.file1.type != 'application/pdf' ){
      this.sendf1.reset();
      this.file1 = null;
      document.getElementById('frepc')?.click();
      this.errmsgf1 = true;
      setTimeout(() => {
        this.errmsgf1 = false
      }, 10000);
      return
    }
    let data = new FormData();
    data.append('id',String(this.stage.id) );
    data.append('file',this.file1);
    try{
      let res:any = await this._stageSer.sendAttest(data).toPromise()
      if(res.etat === true )
        this.stage = await this._stageSer.getStageById(this.stage.id).toPromise();
      else
        console.log('something wrong')
    }catch(err){
      console.log("server error");
    }
    this.file1 = null;
  }

  async Accepter(){
    if( !this.file1 || this.file1.type != 'application/pdf' ){
      this.sendf1.reset();
      this.file1 = null;
      document.getElementById('frepc')?.click();
      this.errmsgf1 = true;
      setTimeout(() => {
        this.errmsgf1 = false
      }, 10000);
      return
    } 
    let data = new FormData();
    data.append('id',String(this.stage.id) );
    data.append('file',this.file1);
    try{
      let res:any = await this._stageSer.AccepterStage1(data).toPromise()
      if( res.etat === true ){
        this.stage.etat = 1 ;
        this.stage = await this._stageSer.getStageById(this.stage.id).toPromise();
      }
      else
        console.log('something wrong')
    }catch(err){
      console.log("server error");
    }
    this.file1 = null;
  }
  async Refuser(){      
      try{
        await this._stageSer.editStage(
          {
            id : this.stage.id ,
            etat : -2 
          }
        ).toPromise();
        this.stage.etat = -2
      }catch(err){
        console.error('request Error: something wrong refresh!!')
      }
  }

  ErrMsgb4 = false ;
  async Accepter2(){
    if(this.stage.poste.id == null){
      this.ErrMsgb4 = true;
      setTimeout(()=>{
        this.ErrMsgb4 = false;
      },10000)
      return
    }
    let data = {
      id : this.stage.id,
      etat : 3
    }
    try{
      await this._stageSer.editStage(data).toPromise();
    this.stage.etat = 3;
    } catch(err){
      this.ngOnInit()
    }
  }
  async Refuser2(){
    let data = {
      id : this.stage.id,
      etat : -3
    }
    try{
      await this._stageSer.editStage(data).toPromise();
      this.stage.etat = -3
    } catch(err){
      this.ngOnInit()
    }
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