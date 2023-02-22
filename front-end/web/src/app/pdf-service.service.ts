import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PdfServiceService {
  base_pdf_service_api = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}


  uploadText(input: string) {
    if (!input || input==="") {
      return of();
    }

    let url = this.base_pdf_service_api + 'fileToPdf';

    const req = new HttpRequest('POST', url, input, {
      reportProgress: true,
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe(
      last(), // return last (completed) message to caller
      catchError(this.handleError(input))
    );
  }

  uploadFile(file: File) {
    if (!file) {
      return of();
    }

    let url = this.base_pdf_service_api + 'fileToPdf';

    const req = new HttpRequest('POST', url, file, {
      reportProgress: true,
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe(
      map((event) => this.getEventMessage(event, file)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file))
    );
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 0;
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  /**
   * Returns a function that handles Http upload failures.
   *
   * @param file - File object for file being uploaded
   *
   * When no `UploadInterceptor` and no server,
   * you'll end up here in the error handler.
   */
  private handleError(file: File | string) {
    const userMessage = `upload failed.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message =
        error.error instanceof Error
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }



  download():Observable<Blob>{
    let url = this.base_pdf_service_api + 'download'
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}
