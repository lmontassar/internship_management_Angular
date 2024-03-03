import { Component, OnInit, ViewChild } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../../services/stagiaire.service';

@Component({
  selector: 'app-edit-email',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css','../profile.component.css']
})
export class EditEmailComponent implements OnInit{
  @ViewChild('editemailForm') thisform !:NgForm;


  ngOnInit() {
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){
          this.thisform.setValue({
            email : this._loginSer.user.email,
          });
          t = true
        }
      }while(t == false);
    })

  }
  emailexiste=false;
  changed = false ;
  onSubmit(){
    this.changed = false;
    let data = {
      id : this._loginSer.user.id,
      email : this.thisform.value.email
    } ;
    
    if( this._stagiaireSer.testAttribute(data.email,5)  || this._loginSer.user.email == data.email){
      document.getElementById('z-email')?.focus();
      return
    }
    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        (res:any) => {
          if( res.status == false ){
            this.emailexiste = true ;
            setTimeout(()=>{
              this.emailexiste = false;
            },20000)
          } else{
            this._loginSer.user.email = data.email ;
            this.changed = true ;
            setTimeout(() => {
              this.changed = false;
            }, 20000);
          }
        } 
      )
  }
  constructor(
    public _stagiaireSer : StagiaireService,
    public _loginSer : LoginService
  ){}
}
