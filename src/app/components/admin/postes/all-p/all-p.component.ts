import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-p',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './all-p.component.html',
  styleUrl: './all-p.component.css'
})
export class AllPComponent {
  constructor(
    private _adminSer : AdminService,
    private router : Router
  ){}

  months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  years :any = []
  filter = {
    date_debut : [0,0],
    date_fin : [0,0]
  }
  GoToPost(id:any){
    this.router.navigate(['/poste/'+id]);
  }
  despostes : any;
  postes : any;
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
    this.postes = await this._adminSer.getAllPoste().toPromise();
    for(let i=0;i<this.postes.length; i++){
      this.postes[i].encadrants = await this._adminSer.getEncadrantByPoste(this.postes[i].id).toPromise();
      this.postes[i].stages = await this._adminSer.getStageByPoste(this.postes[i].id).toPromise();
      this.postes[i].stagesByTime = this.postes[i].stages;
    }
    this.waiting = false;
    let currentDate = new Date();
    let threeMonthsLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());
    this.filter.date_debut[0] =  currentDate.getMonth()+1;
    this.filter.date_debut[1] =  currentDate.getFullYear();
    this.filter.date_fin[0] = threeMonthsLater.getMonth()+1 ;
    this.filter.date_fin[1] =  threeMonthsLater.getFullYear();
    this.filtrer();
    this.despostes = this.postes;
  }
  filtrer(){
    for(let i=0 ; i<this.postes.length ; i++){
      this.postes[i].stagesByTime = this.postes[i].stages.filter((stage:any)=>{
        let dd = new Date(stage.date_debut);
        let df = new Date(stage.date_debut);
        let c1 = [true,true,true,true];
        if( this.filter.date_debut[1] != 0 ){
          c1[0] = this.filter.date_debut[1] <= dd.getFullYear() ;
          if(this.filter.date_debut[0] != 0 && this.filter.date_debut[1] == dd.getFullYear() ) {
            c1[1] = this.filter.date_debut[0] <= dd.getMonth()+1 ;
          }
        }
        if( this.filter.date_fin[1] != 0 ){
          c1[2] = this.filter.date_fin[1] >= df.getFullYear() ;
          if(this.filter.date_fin[0] != 0 && this.filter.date_fin[1] == df.getFullYear() ) {
            c1[3] = this.filter.date_fin[0] >= df.getMonth()+1 ;
          }
        }
        return (c1[0] && c1[1] && c1[2] && c1[3]);
      })
    }
  }
  @ViewChild('Sf') sf !:NgForm;
  search(){
    this.postes = this.despostes.filter( (poste:any)=>{
      let val = this.sf.value.search.trim();
      if(val == "") return true
      let f1 =  String(poste.id).toLowerCase().indexOf(val.toLowerCase()) >= 0 ;
      let f2 =  poste.region.region.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      let f3 =  poste.nom_residence.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      let f4 =  poste.adresse.toLowerCase().indexOf(val.toLowerCase()) >= 0;
      return ( f1 || f2 || f3 || f4 );
    } )
  }


  srt = 1;
  ca1 = -1;
  sort(x:any){
    this.ca1 = x;
    switch(x){
      case 0:{
        this.postes = this.despostes.sort( (a:any,b:any) =>{
          if(a.id>b.id)return 1* this.srt;
          if(a.id<b.id) return -1 * this.srt;
          return 0;
        } )
        break
      }
      case 1:{
        this.postes = this.despostes.sort( (a:any,b:any)=>{
          if(a.region.region > b.region.region)return 1* this.srt;
          if(a.region.region < b.region.region) return -1 * this.srt;
          return 0;
        } )
        break
      } 
      case 2:{
        this.postes = this.despostes.sort( (a:any,b:any)=>{
          if(a.nom_residence > b.nom_residence)return 1* this.srt;
          if(a.nom_residence < b.nom_residence) return -1 * this.srt;
          return 0;
        } )
        break
      } 
      case 3:{
        this.postes = this.despostes.sort( (a:any,b:any)=>{
          if(a.adresse > b.adresse )return 1* this.srt;
          if(a.adresse < b.adresse ) return -1 * this.srt;
          return 0;
        } )
        break
      } 
      case 4:{
        this.postes = this.despostes.sort( (a:any,b:any)=>{
          if( a.encadrants.length > b.encadrants.length )return 1* this.srt;
          if( a.encadrants.length < b.encadrants.length ) return -1 * this.srt;
          return 0;
        } )
        break
      } 
      case 5:{
        this.postes = this.despostes.sort( (a:any,b:any)=>{
          if( a.stagesByTime.length > b.stagesByTime.length )return 1* this.srt;
          if( a.stagesByTime.length < b.stagesByTime.length ) return -1 * this.srt;
          return 0;
        } )
        break
      }
    }
    this.srt *= -1
  }

}
