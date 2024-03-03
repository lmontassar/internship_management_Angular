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
  selector: 'app-attestation-pdf',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    NgxExtendedPdfViewerModule
  ],animations: [
    trigger('state', [
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ]), ],
  templateUrl: './attestation-pdf.component.html',
  styleUrl: './attestation-pdf.component.css'
})
export class AttestationPdfComponent implements OnInit{
  paper = faPaperPlane;
  data :any ;
  cin = true;
  @ViewChild('form') form!:NgForm;
  ngOnInit(): void {
    this.cin = true;
    this.data = {...this.host.stage};
    let dd=new Date(this.data.date_debut)
    let df=new Date(this.data.date_fin)
    let obj = {
      id: this.data.id +'/AS/DF/'+ new Date().getFullYear(),
      type : this.data.type ,
      date_debut : dd.getFullYear()+'-'+(dd.getMonth()+1).toString().padStart(2, '0')+'-'+(dd.getDate()).toString().padStart(2, '0') ,
      date_fin :  df.getFullYear()+'-'+(df.getMonth()+1).toString().padStart(2, '0')+'-'+(df.getDate()).toString().padStart(2, '0') ,
      cin : (this.data.stagiaire.cin) ? (this.data.stagiaire.cin) : null,
      passport : (this.data.stagiaire.passport) ? (this.data.stagiaire.passport) : null,
      etudiant : this.data.stagiaire.nom + ' '+ this.data.stagiaire.prenom,
      institut : this.data.stagiaire.institut
    }
    if(obj.cin == null){ 
      this.cin = false;
      delete obj.cin;
    }else delete obj.passport;

    setTimeout(()=>{
      this.form.setValue(obj);
      this.genererPDF();
    })
  }
  exit(){
    this._stageCom.open_attestation = false;
  }
  constructor(
    public host:StageComponent,
    public _adminSer: AdminService,
    public _stageCom: StageComponent
  ){}

  pdfchanged = false ;
  refic = false;
  ref = faArrowsRotate;
  imp = faPrint;
  fck = faCircleCheck
  file = faFilePdf
  genererMessage = "Générer le PDF";
  PDF : any = null;
  async genererPDF() {
    this.refic = true ;
    let data = this.form.value;
    let res = await this._adminSer.GenerateAttestation(data).toPromise();
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
