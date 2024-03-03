import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { BureauService } from '../../../services/bureau.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-poste',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule
  ],
  templateUrl: './poste.component.html',
  styleUrl: './poste.component.css'
})
export class PosteComponent {
  encopen=false;
  openenc(){
    this.encopen = !this.encopen
  }
  stageopen=false;
  openstage(){
    this.stageopen = !this.stageopen
  }

  poste : any;
  waiting = true;
  async ngOnInit(){
    this._loginSer.check_login(2);
    await this._loginSer.loadUserData();
    let id = this.route.snapshot.paramMap.get('id');
    this.poste = await this._posteSer.getPosteById(id).toPromise();
    this.poste.encadrants = await this._adminSer.getEncadrantByPoste(id).toPromise();
    this.poste.stages = await this._adminSer.getStageByPoste(id).toPromise();
    this.waiting = false
  }

  constructor(
    private _loginSer : LoginService,
    private _adminSer : AdminService,
    private _posteSer : BureauService,
    private route : ActivatedRoute
  ){}
  srt = 1;
  ca1 = -1;
  srtdf : any = null;
  sort(x: number) {
    switch (x) {
        case 0:{
          this.ca1 = 0;
          this.srtdf = null;
          this.poste.stages.sort( (a: any, b: any) => {
              if ( a.stagiaire.cin && b.stagiaire.passport ) return -1*this.srt;
              if ( a.stagiaire.passport && b.stagiaire.cin ) return 1*this.srt;
              return 0;
          });
          break;
        }
        case 1 :{
          this.ca1 = 1;
          this.srtdf = null;
          this.poste.stages.sort( (a: any, b: any) => {
            if ( new Date(a.id) < new Date(b.id) ) return -1*this.srt;
            if ( new Date(a.id) > new Date(b.id)  ) return 1*this.srt;
            return 0;
          });
          break;
        }
        case 3:{
          this.ca1 = -1;
          this.srtdf = null;
          this.poste.stages.sort( (a:any,b:any) => {
            if( a.stagiaire.institut.toLowerCase() < b.stagiaire.institut.toLowerCase() ) return -1 *this.srt;
            if( a.stagiaire.institut.toLowerCase() > b.stagiaire.institut.toLowerCase() ) return 1 *this.srt;
            return 0;
          } )
          break
        }
        case 6:{
          this.ca1 = -1;
          this.srtdf = null;
          this.poste.stages.sort( (a:any,b:any) => {
            if( a.type.toLowerCase() < b.type.toLowerCase() ) return -1 *this.srt;
            if( a.type.toLowerCase() > b.type.toLowerCase() ) return 1 *this.srt;
            return 0;
          } )
          break
        }
        case 7:{
          this.ca1 = -1;
          if (this.srtdf == null )  this.srtdf = [1,1];
          if      ( this.srtdf[0] == 1 && this.srtdf[1] == 1 ) this.srtdf = [1,-1];
          else if ( this.srtdf[0] == 1 && this.srtdf[1] == -1 ) this.srtdf = [-1,1];
          else if ( this.srtdf[0] == -1 && this.srtdf[1] == 1 ) this.srtdf = [-1,-1];
          else if ( this.srtdf[0] == -1 && this.srtdf[1] == -1 ) this.srtdf = [1,1];
          this.poste.stages.sort( (a:any,b:any) => {
            if( this.srtdf[0] == -1) {
                if( new Date(a.date_debut) < new Date(b.date_debut) ) return -1 *this.srtdf[1] ;
                if( new Date(a.date_debut) > new Date(b.date_debut) ) return 1 *this.srtdf[1];
                return 0;
            }else {
                if( new Date(a.date_fin) < new Date(b.date_fin) ) return -1 *this.srtdf[1];
                if( new Date(a.date_fin) > new Date(b.date_fin) ) return 1 *this.srtdf[1];
                return 0;
            }
          })
          
          break
        }
        case 8:{
          this.ca1 = -1;
          this.srtdf = null;
          this.poste.stages.sort( (a:any,b:any) => {
            if( a.etat < b.etat ) return -1 *this.srt;
            if( a.etat > b.etat ) return 1 *this.srt;
            return 0;
          } )
          break
        }
    }
    this.srt *= -1;
}
enstage( DD :any, DF : any ){
  let dn = new Date().getTime()
  let d1 = new Date(DD).getTime();
  let d2 = new Date(DF).getTime();
  return (d1<dn && dn< d2);
}
afterstage( DF : any){
  let dn = new Date().getTime();
  let d2 = new Date(DF).getTime();
  return ( dn > d2);
}
}

