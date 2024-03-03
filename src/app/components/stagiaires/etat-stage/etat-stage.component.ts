import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StageService } from '../../../services/stage.service';
import { WaitingComponent } from './waiting/waiting.component';
import { InformationsComponent } from './informations/informations.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-etat-stage',
  standalone: true,
  imports: [
    FaIconComponent,
    WaitingComponent,
    InformationsComponent
  ],
  templateUrl: './etat-stage.component.html',
  styleUrl: './etat-stage.component.css'
})
export class EtatStageComponent implements OnInit {
  stage :any = null;
  ck = faCheck;
  ref = faXmark

  async ngOnInit(){
    this._loginSer.check_login(1);
    await this._loginSer.loadUserData();
    let id = this.route.snapshot.paramMap.get('id');
    try{
      this.stage = await this._stageSer.getStageById(id).toPromise();
    }catch(err){
      this.router.navigate(['liste']);
      return
    }
    if (this.stage.stagiaire.id == this._loginSer.user.id ){
    } else {
      this.router.navigate(['liste']);
    }
  }



  constructor(
    private _loginSer : LoginService,
    private _stageSer : StageService,
    private route : ActivatedRoute,
    private router : Router
  ){}
}
