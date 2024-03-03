import { Component, HostListener, ViewChild } from '@angular/core';
import { StageService } from '../../../../services/stage.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../../../services/admin.service';
import { EncadrantService } from '../../../../services/encadrant.service';
import { StagiaireService } from '../../../../services/stagiaire.service';
import { BureauService } from '../../../../services/bureau.service';
import { Stagiaire } from '../../../../models/stagiaire';
import { FormsModule, NgForm } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule,
    FormsModule,
    DataTablesModule
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {

  months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  years :any = []
  filter2 = {
    date_debut : [0,0],
    date_fin : [0,0],
    etat : 0
  }
  waiting = true;








  Stages : any = [];
  StagesFiltred : any =[];
  srt = 1;
  ca1 = -1;
  srtdf : any = null;
  filterdisplay = false ;
  filter = {
              etat : [false,false,false,false,false],
              date_debut : [ null , null ],
              date_fin : [ null, null ]
  }
  filterActive = false;
  @HostListener('document:click', ['$event'])
  losefocus(e: Event): void {
    const clicked = e.target as HTMLElement;  
    if (!clicked.closest('.filter.open')) {
      this.filterdisplay = false;
    }
  }


  filteract(){
    this.filterdisplay = !this.filterdisplay;
  }

  ck(x:any){
    this.filter.etat[x] = !this.filter.etat[x];
    this.filtrer();
  }
  resetFilter(){
    this.filterActive = false;
    this.filter = {
      etat : [false,false,false,false,false],
      date_debut : [ null , null ],
      date_fin : [ null, null ],
    }
    this.StagesFiltred = this.Stages
  }
  
  filtrer(){
    this.filterActive = !( 
      this.filter.etat[0] == false &&
      this.filter.etat[1] == false &&
      this.filter.etat[2] == false &&
      this.filter.etat[3] == false &&
      this.filter.etat[4] == false && 
      this.filter.date_debut[0] == null &&
      this.filter.date_debut[1] == null &&
      this.filter.date_fin[0] == null &&
      this.filter.date_fin[1] == null
      );
    if( 
      this.filter.etat[0] == false && 
      this.filter.etat[1] == false&&
      this.filter.etat[2] == false&&
      this.filter.etat[3] == false&&
      this.filter.etat[4] == false&&
      this.filter.date_debut[0] == null &&
      this.filter.date_debut[1] == null &&
      this.filter.date_fin[0] == null &&
      this.filter.date_fin[1] == null
      ) {
        this.StagesFiltred = this.Stages
        return
      }
    this.StagesFiltred = this.Stages.filter( (stage :any )=>{
      let f1,f2,f3,f4,f5;
      let dn = new Date().getTime()
      f1 = ( ( ( stage.etat == 0 || stage.etat == 2 || stage.etat == 4) 
            || ( stage.etat == 3 && this.afterstage(stage.date_fin) ) ) || !this.filter.etat[0]  );
      f2 = ( ( stage.etat == 1 || stage.etat == 3)  || !this.filter.etat[1] );
      f3 = ( stage.etat < 0 || !this.filter.etat[2] );
      f4 = ( stage.etat == 5 || !this.filter.etat[3]);
      f5 = ( (stage.etat ==3) && (this.enstage( stage.date_debut,stage.date_fin )) || !this.filter.etat[4] )
      let f6 = true;
      let f7 = true;
      let f8 = true;
      let f9 = true;
      if(this.filter.date_debut[0]) f6 = new Date( this.filter.date_debut[0]).getTime() <= new Date(stage.date_debut).getTime()
      if(this.filter.date_debut[1] ) f7 = new Date( this.filter.date_debut[1]).getTime() >= new Date(stage.date_debut).getTime()
      if(this.filter.date_fin[0]) f8 =  new Date( this.filter.date_fin[0]).getTime() <= new Date(stage.date_fin).getTime()
      if(this.filter.date_fin[1]) f9 = new Date( this.filter.date_fin[1]).getTime() >= new Date(stage.date_fin).getTime()
      return f1 && f2 && f3 && f4 && f5 && f6 && f7 && f8 && f9;
    })
  }

  sort(x: number) {
    switch (x) {
        case 0:{
          this.ca1 = 0;
          this.srtdf = null;
          this.StagesFiltred.sort( (a: any, b: any) => {
              if ( a.stagiaire.cin && b.stagiaire.passport ) return -1*this.srt;
              if ( a.stagiaire.passport && b.stagiaire.cin ) return 1*this.srt;
              return 0;
          });
          break;
        }
        case 1 :{
          this.ca1 = 1;
          this.srtdf = null;
          this.StagesFiltred.sort( (a: any, b: any) => {
            if ( new Date(a.id) < new Date(b.id) ) return -1*this.srt;
            if ( new Date(a.id) > new Date(b.id)  ) return 1*this.srt;
            return 0;
          });
          break;
        }
        case 3:{
          this.ca1 = -1;
          this.srtdf = null;
          this.StagesFiltred.sort( (a:any,b:any) => {
            if( a.stagiaire.institut.toLowerCase() < b.stagiaire.institut.toLowerCase() ) return -1 *this.srt;
            if( a.stagiaire.institut.toLowerCase() > b.stagiaire.institut.toLowerCase() ) return 1 *this.srt;
            return 0;
          } )
          break
        }
        case 4 :{
          this.ca1 = 4;
          this.srtdf = null;
          this.StagesFiltred.sort( (a: any, b: any) => {
            if ( a.region.region < b.region.region ) return -1*this.srt;
            if ( a.region.region  > b.region.region ) return 1*this.srt;
            return 0;
          });
          break;
        }
        case 6:{
          this.ca1 = -1;
          this.srtdf = null;
          this.StagesFiltred.sort( (a:any,b:any) => {
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
          this.StagesFiltred.sort( (a:any,b:any) => {
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
          this.StagesFiltred.sort( (a:any,b:any) => {
            if( a.etat < b.etat ) return -1 *this.srt;
            if( a.etat > b.etat ) return 1 *this.srt;
            return 0;
          } )
          break
        }
        case 10 :{
          this.ca1 = 10;
          this.srtdf = null;
          this.StagesFiltred.sort( (a: any, b: any) => {
            if ( a.id < b.id ) return -1*this.srt;
            if ( a.id > b.id  ) return 1*this.srt;
            return 0;
          });
          break;
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

  dtOptions: DataTables.Settings = {};
  async ngOnInit(){
    this.Stages = await this._stageSer.getAllStage().toPromise();
    this.StagesFiltred = this.Stages;
    this.dtOptions = {};
    this.filter2 = {
      date_debut : [0,0],
      date_fin : [0,0],
      etat : 0,
    }
    for(let i = 2023 ;i< 2050 ;i++){
      this.years.push(i);
    } 
    /*
    let currentDate = new Date();
    let threeMonthsLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());
    this.filter2.date_debut[0] =  currentDate.getMonth()+1;
    this.filter2.date_debut[1] =  currentDate.getFullYear();
    this.filter2.date_fin[0] = threeMonthsLater.getMonth()+1 ;
    this.filter2.date_fin[1] =  threeMonthsLater.getFullYear();
    this.filtrer2()
    */
  }
  @ViewChild('Sf') Sform !:NgForm;
  search(){
    let val = this.Sform.value.search.trim().toLowerCase();
    if(val == "") {
      this.StagesFiltred = this.Stages
      return
    }
    this.StagesFiltred = this.Stages.filter(
      (stage:any) => {
        let r6 = ( String(stage.id+"/"+new Date(stage.date_demande).getFullYear() ).indexOf(val) >=0 );
        let r1 = ( stage.stagiaire.cin == null  ) ? ( String(stage.stagiaire.passport).indexOf(val)>=0 ) : ( String(stage.stagiaire.cin).indexOf(val)>=0 );
        let r2 = String(stage.stagiaire.nom + " " +stage.stagiaire.prenom ).toLowerCase().indexOf(val) >=0   || String(stage.stagiaire.prenom + " " +stage.stagiaire.nom ).toLowerCase().indexOf(val) >=0 
        let r3 = String(stage.stagiaire.institut).toLowerCase().indexOf(val) >= 0;
        let r4 = (stage.poste) ? stage.poste.region.region.toLowerCase().indexOf(val)>=0 || stage.poste.nom_residence.toLowerCase().indexOf(val)>=0 || stage.poste.adresse.toLowerCase().indexOf(val)>=0 : false ;
        let r5 = (stage.encadrant) ? String(stage.encadrant.nom+ " " + stage.encadrant.prenom).toLowerCase().indexOf(val)>=0 || String(stage.encadrant.prenom+" " + stage.encadrant.nom).toLowerCase().indexOf(val)>=0 : false;
        let r7 =  stage.region.region.toLowerCase().indexOf(val)>=0; 
        return r1 || r2 || r3 || r4 || r5 || r6 || r7;
      }
    )
  }
  constructor(
    private _stageSer : StageService,
    private _adminSer : AdminService,
    private _encadrantSer : EncadrantService,
    private _stagiaireSer : StagiaireService,
    private _bureauSer : BureauService
  ){   
  }
  filtrer2(){
      this.StagesFiltred = this.Stages.filter((stage:any)=>{
        let dd = new Date(stage.date_debut);
        let df = new Date(stage.date_debut);
        let c1 = [true,true,true,true,true];
        if( this.filter2.date_debut[1] != 0 ){
          c1[0] = this.filter2.date_debut[1] <= dd.getFullYear() ;
          if(this.filter2.date_debut[0] != 0 && this.filter2.date_debut[1] == dd.getFullYear() ) {
            c1[1] = this.filter2.date_debut[0] <= dd.getMonth()+1 ;
          }
        }
        if( this.filter2.date_fin[1] != 0 ){
          c1[2] =  this.filter2.date_fin[1] >= df.getFullYear() ;
          if(this.filter2.date_fin[0] != 0 && this.filter2.date_fin[1] == df.getFullYear() ) {
            c1[3] = this.filter2.date_fin[0] >= df.getMonth() + 1 ;
            
          }

        }
        let e = this.filter2.etat;
        c1[4] = e == 0 || (e == 1 && stage.etat <= -2 ) || ( e == 2 && ( stage.etat == 0 || stage.etat == 2 || stage.etat ==4 || (stage.etat == 3 && (this.afterstage( stage.date_fin )) ) ) ) || (e == 3 && (stage.etat == 1 || (stage.etat == 3 && (!this.afterstage( stage.date_debut )) ) )) || (e==4 && stage.etat == 5) || (e==5 && stage.etat == 3 && this.enstage(stage.date_debut,stage.date_fin))
        return (c1[0] && c1[1] && c1[2] && c1[3] && c1[4]);
    })
  }
}