import { Component, OnInit, ViewChild } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { StagiaireService } from '../../../../services/stagiaire.service';
import { RegionService } from '../../../../services/region.service';

@Component({
  selector: 'app-edit-adresse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-adresse.component.html',
  styleUrls: ['./edit-adresse.component.css','../profile.component.css']
})
export class EditAdresseComponent implements OnInit {

  regions : any = [] 
  async SelectRegion(){
    this.regions = await this._regionSer.getAll().toPromise();
  }

  @ViewChild('editadresseForm') thisform !:NgForm;
  async ngOnInit() {
    await this.SelectRegion();
    setTimeout(()=>{
      let t = false;
      do{
        if( this._loginSer.user ){

          this.thisform.setValue({
            id_region : this._loginSer.user.region.id 
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
      id_region : this.thisform.value.id_region
    };
    if(Number(data.id_region)< 1 || Number(data.id_region)>24 || data.id_region == this._loginSer.user.region.id ){
      document.getElementById('z-r')?.focus();
      return 
    }

    this._stagiaireSer.editStagiaire(data)
      .subscribe(
        res => {
          this._loginSer.user.region = this.regions[data.id_region-1] ;
          
          this.changed = true ;
          setTimeout(() => {
            this.changed = false;
          }, 20000);
        }
      )
  }
  constructor(
    public _stagiaireSer : StagiaireService,
    public _loginSer : LoginService,
    private _regionSer : RegionService
  ){}
}
