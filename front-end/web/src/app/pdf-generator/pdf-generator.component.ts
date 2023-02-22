import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss'],
})
export class PdfGeneratorComponent {
  userText = new FormControl('');

  // fileForm = new FormGroup({
  //   file: new FormControl(''),
  // });

  fileToUpload: File | null = null;

  convertUserText(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }
  }

  // convertUserFile(){
  //   console.log(this.fileForm.value);
  // }

  handleFileInput(ev: Event) {

    // if(ev.target.files){

    // }

    // this.fileToUpload = files.item(0);
  }
}
