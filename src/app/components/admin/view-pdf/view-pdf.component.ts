import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdminService } from '../../../services/admin.service';
import { NgxExtendedPdfViewerModule, /*NgxExtendedPdfViewerService ,*/ pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-pdf',
  standalone: true,
  imports: [
  NgxExtendedPdfViewerModule,
  FaIconComponent
],
  templateUrl: './view-pdf.component.html',
  styleUrl: './view-pdf.component.css'
})
export class ViewPdfComponent implements OnInit{
  downicon = faDownload

  constructor(
    //private pdfService: NgxExtendedPdfViewerService,
    public _adminSer : AdminService,
  ){
    this.src = this._adminSer.blobToView as Blob ;
    /*
      pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
      pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; 
    */
  }
  src;
  ngOnInit() {
    
  }
  Download(){
    let url = window.URL.createObjectURL(this.src);
    let a = document.createElement("a");
    a.href = url;
    a.download = this._adminSer.title+'.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
