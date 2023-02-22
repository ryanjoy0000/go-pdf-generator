import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfServiceService } from '../pdf-service.service';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss'],
})
export class PdfGeneratorComponent {
  constructor(private pdfService: PdfServiceService, private router: Router) {}

  userText = new FormControl('');

  fileForm = new FormGroup({
    file: new FormControl(''),
  });

  fileToUpload: File | null = null;

  convertUserText(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }
    let userInput = this.userText.value;
    if (userInput && userInput !== '') {
      this.pdfService.uploadText(userInput).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/download']);
        }
      );
    }
  }


  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      this.pdfService.uploadFile(file).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/download']);
        }
      );
    }
  }

}
