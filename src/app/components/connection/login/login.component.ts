import {  Component,  ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../services/stagiaire.service';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  @ViewChild('inscriForm') inscriForm !:NgForm;
  constructor(
    private _stagiaireSer: StagiaireService ,
    private router: Router,
    private _loginSer: LoginService,
    private _adminSer: AdminService
    ) { }
  typerr = -1 ;
  messerr = "";
  async ngOnInit(){
    this._loginSer.check_login(0);
  }
  async onSubmit(){
    this.typerr = -1 ;
    if( !this.inscriForm.value.email ){
      document.getElementById('emailid')?.focus()
      return
    }
    if( !this.inscriForm.value.password ){
      document.getElementById('passid')?.focus()
      return
    }
    if( (this.inscriForm.value.email && this.inscriForm.value.password) ){
      let res:any = await this._stagiaireSer.LoginStagiaire(this.inscriForm.value).toPromise();
      if( res.typeErr!=null ){
        this.typerr = res.typeErr;
        if( this.typerr == 1 )
          document.getElementById('passid')?.focus();
        } if(this.typerr == 0){
          res = await this._adminSer.Login(this.inscriForm.value).toPromise();
        }   
        if(res.mytoken){
          localStorage.setItem('token',res.mytoken);
          await this._loginSer.loadUserData();
          if( this._loginSer.type == 0 ){ //logged as a stagiaire
            localStorage.setItem('type','0');
            this.router.navigate(["/liste"]);
          }else if( this._loginSer.type == 1 ){ //logged as an admin
            localStorage.setItem('type','1');
            this.router.navigate(["/stageAd"]);
          }
        }
        if(res.typErr == 0){
          document.getElementById('emailid')?.focus();
        }
        this.messerr = res.message;
        setTimeout(() => {
            this.typerr=-1;
            this.messerr=""; 
        }, 15000);
    } 
  }
}
