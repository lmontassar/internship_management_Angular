import { Component, ViewChild } from '@angular/core';
import { StagiaireService } from '../../../../services/stagiaire.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css','../profile.component.css']
})
export class EditPasswordComponent {
  @ViewChild('editpasswordForm') thisform !:NgForm;
  currpass = false ;
  changed = false;
  onSubmit(){
    this.changed = false ;
    let data = {
      id : this._loginSer.user.id,
      currPass : this.thisform.value.currPass,
      newPass : this.thisform.value.newPass
    } ;
    if(  this._stagiaireSer.testAttribute(data.currPass , 6)  ){
      document.getElementById('z-currpass')?.focus();
      return
    }
    if(  this._stagiaireSer.testAttribute(data.newPass , 6)  ){
      document.getElementById('z-newpass')?.focus();
      return
    }
    if( data.newPass != this.thisform.value.renewPass ) {
      document.getElementById('z-renewpass')?.focus();
      return
    }


    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        (res:any) => {
          if(res.status == false){
            document.getElementById('z-currpass')?.focus();
            this.currpass = true ;
            setTimeout(() => {
              this.currpass = false ;
            }, 5000);
          } else {
            this.changed = true ; 
            setTimeout(()=>{
              this.changed = false;
            },20000);
            this.thisform.reset();
          }
        } , 
        err =>{
          console.log(err);
        }
      )
  }

  constructor(
    public _stagiaireSer: StagiaireService ,
    private _loginSer : LoginService
  ){}
}
