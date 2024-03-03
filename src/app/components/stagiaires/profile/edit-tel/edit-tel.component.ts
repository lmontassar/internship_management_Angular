import { Component, OnInit, ViewChild } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../../services/stagiaire.service';

@Component({
  selector: 'app-edit-tel',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-tel.component.html',
  styleUrls: ['./edit-tel.component.css','../profile.component.css']
})
export class EditTelComponent implements OnInit {

  @ViewChild('edittelForm') thisform !:NgForm;
  ngOnInit() {
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){
          this.thisform.setValue({
            tel : this._loginSer.user.tel,
          });
          t = true
        }
      }while(t == false);
    })
  }
  changed = false ;
  onSubmit(){
    this.changed = false;
    let data = {
      id : this._loginSer.user.id,
      tel : this.thisform.value.tel 
    };
    if( 
      this._stagiaireSer.testAttribute(data.tel , 4) || this._loginSer.user.tel == data.tel
    ){
      document.getElementById('z-tel')?.focus();
      return 
    }

    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        res => {
          this._loginSer.user.tel = data.tel ;
          this.changed = true ;
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
