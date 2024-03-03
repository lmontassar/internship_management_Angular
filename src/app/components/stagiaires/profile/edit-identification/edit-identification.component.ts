import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { StagiaireService } from '../../../../services/stagiaire.service';

@Component({
  selector: 'app-edit-identification',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-identification.component.html',
  styleUrls: ['./edit-identification.component.css','../profile.component.css']
})
export class EditIdentificationComponent {
  @ViewChild('editidForm') thisform !:NgForm;


  ngOnInit() {
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){
          // curr cin 
          if(this._loginSer.user.cin){
              this.thisform.setValue({
                c_id : 1 ,
              });
              setTimeout(()=>{
                this.thisform.setValue({
                  c_id : 1,
                  cin : this._loginSer.user.cin,
                });
              })
          }
          // curr passport 
          else{
            this.thisform.setValue({
              c_id : 2,
            });
            setTimeout(()=>{
              this.thisform.setValue({
                c_id : 2,
                passport : this._loginSer.user.passport,
              });
            })
          }

          t = true
        }
      }while(t == false);
    })
  }
  changed = false;
  onSubmit(){
    this.changed = false;
    let data = {...{id : this._loginSer.user.id}, ...this.thisform.value};
    if( data.c_id == 1 ){
      if( this._stagiaireSer.testAttribute( data.cin , 4) || this._loginSer.user.cin == data.cin){
        document.getElementById("z-cin")?.focus();
        return
      }
    } else {
      if( this._stagiaireSer.testAttribute( data.passport , 4) || this._loginSer.user.passport == data.passport){
        document.getElementById("z-passport")?.focus();
        return
      }
    }

    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        res => {
          this._loginSer.user.cin = data.cin;
          this._loginSer.user.passport = data.passport;
          this.changed = true;
          setTimeout(() => {
            this.changed = false;
          }, 20000);
        } , 
        err =>{
          console.log(err);
        }
      )
  }

  constructor(
    public _stagiaireSer : StagiaireService,
    public _loginSer : LoginService
  ){}
}