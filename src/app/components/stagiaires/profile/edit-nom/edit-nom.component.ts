import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StageService } from '../../../../services/stage.service';
import { LoginService } from '../../../../services/login.service';
import { StagiaireService } from '../../../../services/stagiaire.service';

@Component({
  selector: 'app-edit-nom',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-nom.component.html',
  styleUrls: ['./edit-nom.component.css','../profile.component.css']
})
export class EditNomComponent {
  @ViewChild('editnomForm') thisform !:NgForm ;
  ngOnInit() {
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){
          this.thisform.setValue({
            nom : this._loginSer.user.nom,
            prenom : this._loginSer.user.prenom,
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
      nom : this.thisform.value.nom,
      prenom : this.thisform.value.prenom
    } ;

    if(data.nom == this._loginSer.user.nom && data.prenom == this._loginSer.user.prenom ){
      document.getElementById('z-nom')?.focus();
      return 
    }

    if( this._stagiaireSer.testAttribute(data.nom, 1) ){
      document.getElementById('z-nom')?.focus();
      return 
    }
    if( this._stagiaireSer.testAttribute(data.prenom , 1) ){
      document.getElementById('z-prenom')?.focus();
      return 
    }

    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        res => {
          this._loginSer.user.nom = data.nom;
          this._loginSer.user.prenom = data.prenom;

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
