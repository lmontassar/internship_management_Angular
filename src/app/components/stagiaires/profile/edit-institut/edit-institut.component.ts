import { Component, OnInit, ViewChild } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StagiaireService } from '../../../../services/stagiaire.service';

@Component({
  selector: 'app-edit-institut',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-institut.component.html',
  styleUrls: ['./edit-institut.component.css','../profile.component.css']
})
export class EditInstitutComponent implements OnInit{

  @ViewChild('editinstitutForm') thisform !:NgForm;
  ngOnInit() {
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){
          console.log(this._loginSer.user)
          this.thisform.setValue({
            institut : this._loginSer.user.institut,
            filiere : this._loginSer.user.filiere
          });
          t = true
        }
      }while(t == false);
    })

  }

  changed = false;
  onSubmit(){
    this.changed = false;
    let data = {
      id : this._loginSer.user.id,
      institut : this.thisform.value.institut ,
      filiere : this.thisform.value.filiere
    };

    if( (this._stagiaireSer.testAttribute(data.institut , 2) || this._loginSer.user.institut == data.institut )&&(this._stagiaireSer.testAttribute(data.filiere, 2) || this._loginSer.user.filiere == data.filiere) ){
      document.getElementById('z-institut')?.focus();
      return
    }

    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        res => {
          this._loginSer.user.institut = data.institut ;
          this._loginSer.user.institut = data.filiere;
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
