import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { StageComponent } from '../stage/stage.component';
import { FormsModule, NgForm } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faFilePdf, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { AdminService } from '../../../services/admin.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { faArrowsRotate, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reponse-pdf',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './reponse-pdf.component.html',
  styleUrl: './reponse-pdf.component.css',
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ]), ],
})
export class ReponsePdfComponent implements OnInit {
  fck = faCircleCheck
  file = faFilePdf
  paper = faPaperPlane;

  constructor(
    public host:StageComponent,
    public _adminSer: AdminService,
    public _stageCom: StageComponent
  ){}
  @ViewChild('form') form!:NgForm;
  data :any ;
  cin = true;
  ngOnInit(): void {
    this.cin = true;
    this.data = {...this.host.stage};
    let dd=new Date(this.data.date_debut)
    let df=new Date(this.data.date_fin)
    let obj = {
      id: this.data.id +'/RDS/DF/'+ new Date().getFullYear(),
      date_debut : dd.getFullYear()+'-'+(dd.getMonth()+1).toString().padStart(2, '0')+'-'+(dd.getDate()).toString().padStart(2, '0') ,
      date_fin :  df.getFullYear()+'-'+(df.getMonth()+1).toString().padStart(2, '0')+'-'+(df.getDate()).toString().padStart(2, '0') ,
      lieu : (this.data.poste.nom_residence) ? this.data.poste.nom_residence : '',
      etudiant : this.data.stagiaire.nom + ' '+ this.data.stagiaire.prenom,
    }
    setTimeout(()=>{
      this.form.setValue(obj);
      this.genererPDF();
    })
  }
  exit(){
    this._stageCom.open_fichereponse = false;
  }

  pdfchanged = false ;
  refic = false;
  ref = faArrowsRotate;
  imp = faPrint
  genererMessage = "Générer le PDF";
  PDF : any = null;
  async genererPDF() {
    this.refic = true ;
    let data = {...this.form.value,...{n:this.host.stage.id}};
    
    let res = await this._adminSer.GenerateFicheRep(data).toPromise();
    if (res) {
        if (this.PDF != null)this.pdfchanged = true ;
        this.PDF = new Blob([res], { type: 'application/pdf' });
        this._stageCom.file1 = this.PDF;
        this.genererMessage = "Modifier le PDF";
        setTimeout(()=>{
          this.refic = false;
        },300)
        setTimeout(()=>{
          this.pdfchanged = false;
        },10000)
    }
  }

}
