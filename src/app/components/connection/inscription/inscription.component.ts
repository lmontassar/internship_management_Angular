import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../services/stagiaire.service';
import { Router, RouterModule } from '@angular/router';
import { Stagiaire } from '../../../models/stagiaire';
import { LoginService } from '../../../services/login.service';
import { RegionService } from '../../../services/region.service';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    RouterModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  etape = 1; // changes the inputs
  stagiaire = new Stagiaire();
  
  constructor(
    private _stagiaireSer: StagiaireService,
    private router: Router,
    private _loginSer: LoginService,
    private _regionSer : RegionService,
    private _adminSer : AdminService
  ) { }


  /* countries */
  tn = true;
  autre(){
    this.tn = false;
    setTimeout(()=>{
      let t = {...this.inscriForm.value,...{'id_pays':0}}
      this.inscriForm.setValue(t);
    })
  }
  tunisia(){
    this.tn = true;
    this.spays = false;
  }
  countries : any = [];
  async SelectCountries(){
    this.countries = await this._adminSer.getAllCountries().toPromise(); 
  }
  /* end */



  regions : any = [] ;
  async SelectRegion(){
    this.regions = await this._regionSer.getAll().toPromise();
  }
  async ngOnInit(){
    this._loginSer.check_login(0);
    await this.SelectRegion();
    await this.SelectCountries();
    this.inscriForm.setValue({
      nom : '',
      prenom : '',
      institut : '',
      id_region : 0,
      filiere : ''
    })
  }

  @ViewChild('inscriForm') inscriForm !: NgForm;
  prec() {
    let data = this.inscriForm.value;
    delete data.c_id;
    if(this.tn == true) data.id_pays =599;
    this.stagiaire.setInscriPart2(data);
    this.etape = 1;
    setTimeout(() => {
      let obj = { nom: this.stagiaire.nom, prenom: this.stagiaire.prenom, institut: this.stagiaire.institut, id_region: this.stagiaire.id_region, filiere: this.stagiaire.filiere }
      this.inscriForm.setValue(obj);
    });
  }

  suiv() {
    this.stagiaire.setInscriPart1(this.inscriForm.value);
    this.etape = 2;
    let obj :any  = {
      c_id: "1",
      countries : this.tn ? '0': '1' , 
      cin: this.stagiaire.cin != 0 ? this.stagiaire.cin : '',
      tel: this.stagiaire.tel != 0 ? this.stagiaire.tel : '',
      email: this.stagiaire.email,
      password: this.stagiaire.password
    }
    if( !this.tn) obj.id_pays =  this.stagiaire.id_pays
    if (obj.cin == null) obj.cin = '';
    if (this.stagiaire.passport != null && this.stagiaire.passport != 0) {
      obj.c_id = "2";
      setTimeout(() => {
        this.inscriForm.setValue(obj);
      })
      setTimeout(() => {
        delete obj.cin;
        obj = { ...obj, ...{ passport: this.stagiaire.passport } }
        this.inscriForm.setValue(obj);
      })

    } else {
      this.inscriForm.value.c_id = "1";
      setTimeout(() => {
        this.inscriForm.setValue(obj);
      })
    }
  }
  spays = false;
  emailexiste = false ;
  onSubmit() {
    let data = this.inscriForm.value;
    
    data = { ...this.stagiaire, ...data };

    if (this.test(data.nom,1) ){
      this.prec()
      setTimeout(()=>{
        document.getElementById('znom')?.focus();
      })
      return
    }
    if (this.test(data.prenom,1)){
      this.prec()
      setTimeout(()=>{
        document.getElementById('z-prenom')?.focus();
      })
      return
    }
    if (this.test(data.institut,2)){
      this.prec()
      setTimeout(()=>{
        document.getElementById('z-institut')?.focus();
      });
      return
    }
    if ( data.id_region == 0 ){
      this.prec()
      setTimeout(()=>{
        document.getElementById('z-region')?.focus();
      })
      return
    }
  
    if (this.test(data.filiere,2)){
      this.prec()
      setTimeout(()=>{
        document.getElementById('z-filiere')?.focus();
      })
      return
    }

    if (data.c_id == 1){
      if( this.test( data.cin , 4) ){
        setTimeout(()=>{
          document.getElementById('z-cin')?.focus();
        });
        return
      }
    } else{
      if( this.test(data.passport,3) ){
        setTimeout(()=>{
          document.getElementById('z-passport')?.focus();
        })
        return
      }
    }
    if (this.test(data.tel,4)){
      setTimeout(()=>{
        document.getElementById('z-tel')?.focus();
      })
      return
    }

    if (this.test(data.email,5)){
      setTimeout(()=>{
        document.getElementById('z-email')?.focus();
      })
      return
    }
    if (this.test(data.password,6)){
      setTimeout(()=>{
        document.getElementById('z-password')?.focus();
      })
      return
    }
    if(this.tn ) data.id_pays = 599 //tunisia Id
    else if(data.id_pays == 0 ){  
      this.spays = true;
      document.getElementById('pays')?.focus();
      setTimeout(() => {
        this.spays = false;
      }, (10000));
      return 
    }
    delete data.c_id;
    this._stagiaireSer.AddStagiaire(data)
      .subscribe(
        (res:any) => {
          if(res.type != null){
            if(res.type == 0){
              this.emailexiste = true;
              setTimeout(()=>{
                this.emailexiste = false;
              },20000);
            } else {
            this._stagiaireSer.LoginStagiaire(data)
            .subscribe(
              (res: any) => {
                localStorage.setItem('token', res.mytoken);
                localStorage.setItem('type','0'); // 0-> stagiaire
                this.router.navigate(['/liste']);
              }
            )
            }
          }
        }
      );
  }
  test( val : any , c :any){
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
}
