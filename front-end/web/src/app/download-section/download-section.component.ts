import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdfServiceService } from '../pdf-service.service';
import {saveAs as pluginSaveAs} from "file-saver";


@Component({
  selector: 'app-download-section',
  templateUrl: './download-section.component.html',
  styleUrls: ['./download-section.component.scss']
})
export class DownloadSectionComponent {

  fileName = 'final.pdf'

  constructor(private pdfService: PdfServiceService, private router: Router) {}

  download(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }

    this.pdfService.download().subscribe(
      (blob) => {
        pluginSaveAs(blob, this.fileName)
    });
  }

  goBack(ev:Event){
    if (ev) {
      ev.preventDefault();
    }

    this.router.navigate(['/pdf-gen']);
  }
}
