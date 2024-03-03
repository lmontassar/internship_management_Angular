import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-encadrants',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './encadrants.component.html',
  styleUrl: './encadrants.component.css'
})
export class EncadrantsComponent {
  constructor(
    private _adminSer : AdminService,
    private router : Router
  ){}
  GoToEncadrant(id:any){
    this.router.navigate(['encadrant/'+id]);
  }
  months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  years :any = []
  filter = {
    date_debut : [0,0],
    date_fin : [0,0]
  }
  encadrants2 : any
  encadrants : any;
  waiting = true;
  async ngOnInit(){
    this.filter = {
      date_debut : [0,0],
      date_fin : [0,0]
    }
    this.waiting = true;
    for(let i = 2023 ;i< 2050 ;i++){
      this.years.push(i);
    } 
    this.encadrants = await this._adminSer.getAllEncadrant().toPromise();
    for(let i=0;i<this.encadrants.length; i++){
      this.encadrants[i].stages = await this._adminSer.getStageByEncadrants(this.encadrants[i].id).toPromise()
      this.encadrants[i].stagesByTime =  this.encadrants[i].stages;
    }

    this.waiting = false;
    let currentDate = new Date();
    let threeMonthsLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());
    this.filter.date_debut[0] =  currentDate.getMonth()+1;
    this.filter.date_debut[1] =  currentDate.getFullYear();
    this.filter.date_fin[0] = threeMonthsLater.getMonth()+1 ;
    this.filter.date_fin[1] =  threeMonthsLater.getFullYear();
    this.filtrer();
    this.encadrants2 = this.encadrants; 
  }
  filtrer(){
    for(let i=0 ; i<this.encadrants.length ; i++){
      this.encadrants[i].stagesByTime = this.encadrants[i].stages.filter((stage:any)=>{
        let dd = new Date(stage.date_debut);
        let df = new Date(stage.date_debut);
        let c1 = [true,true,true,true];
        if( this.filter.date_debut[1] != 0 ){
          c1[0] = this.filter.date_debut[1] <= dd.getFullYear() ;
          if(this.filter.date_debut[1] != 0 &&  this.filter.date_debut[1] == dd.getFullYear() ) {
            c1[1] = this.filter.date_debut[0] <= dd.getMonth()+1 ;
          }
        }
        if( this.filter.date_fin[1] != 0 ){
          c1[2] = this.filter.date_fin[1] >= df.getFullYear() ;
          if(this.filter.date_fin[1] != 0 && this.filter.date_fin[1] == df.getFullYear()) {
            c1[3] = this.filter.date_fin[0] >= df.getMonth()+1 ;
          }
        }
        return (c1[0] && c1[1] && c1[2] && c1[3]);
      })
    }
  }

  @ViewChild('Sf') sf !:NgForm;
  search(){
    this.encadrants = this.encadrants2.filter( (encadrant:any)=>{
      let val = this.sf.value.search.trim();
      if(val == "") return true
      let f1 =  String(encadrant.id).toLowerCase().indexOf(val.toLowerCase()) >= 0 ;
      let f2 = (encadrant.prenom + " " +encadrant.nom).toLowerCase().indexOf(val.toLowerCase()) >= 0 ||  (encadrant.nom+" "+encadrant.prenom).toLowerCase().indexOf(val.toLowerCase()) >= 0 ;
      let f3 =  String(encadrant.tel).toLowerCase().indexOf(val.toLowerCase()) >= 0;
      let f4 =  encadrant.email.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      let f5 =  encadrant.poste.nom_residence.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      let f6 =  encadrant.specialite.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      return ( f1 || f2 || f3 || f4 || f5 || f6 );
    } )
  }

  ca1 = -1;
  srt = 1;
  sort(x:number){
    this.ca1 = x;
    switch(x){
      case 0 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.id > b.id  ) return 1*this.srt;
          if( a.id < b.id ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 1 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.nom > b.nom  ) return 1*this.srt;
          if( a.nom < b.nom ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 2 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.tel > b.tel  ) return 1*this.srt;
          if( a.tel < b.tel ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 4 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.poste.nom_residence > b.poste.nom_residence  ) return 1*this.srt;
          if( a.poste.nom_residence < b.poste.nom_residence ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 5 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.specialite > b.specialite  ) return 1*this.srt;
          if( a.specialite < b.specialite ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 6 :{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.stagesByTime > b.stagesByTime  ) return 1*this.srt;
          if( a.stagesByTime < b.stagesByTime ) return -1*this.srt;
          return 0;
        } )
        break;
      }
      case 3:{
        this.encadrants = this.encadrants2.sort( (a:any,b:any) =>{
          if( a.email > b.email  ) return 1*this.srt;
          if( a.email < b.email ) return -1*this.srt;
          return 0;
        } )
        break;
      }
    }
    this.srt *=-1; 
  }
}
