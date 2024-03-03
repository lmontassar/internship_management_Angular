import { Component, OnInit } from '@angular/core';
import { StageService } from '../../../services/stage.service';
import { StagiaireService } from '../../../services/stagiaire.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { EditAdresseComponent } from './edit-adresse/edit-adresse.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { EditIdentificationComponent } from './edit-identification/edit-identification.component';
import { EditInstitutComponent } from './edit-institut/edit-institut.component';
import { EditNomComponent } from './edit-nom/edit-nom.component';
import { EditTelComponent } from './edit-tel/edit-tel.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    EditEmailComponent,
    EditIdentificationComponent,
    EditInstitutComponent,
    EditAdresseComponent,
    EditNomComponent,
    EditTelComponent,
    EditPasswordComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  edit ?: number  ;
  Edit(x:any){
    this.edit = x ;
  }
  async ngOnInit(){
    this.edit = 0 ;
    this._loginSer.check_login(1);
    await this._loginSer.loadUserData();
    this.edit = 0 ;

  }
  constructor(
    public _stageSer : StageService,
    public _stagiaireSer : StagiaireService,
    public _loginSer : LoginService,
    private router: Router
  ){}

}
