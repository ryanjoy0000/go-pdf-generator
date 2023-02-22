import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadSectionComponent } from './download-section/download-section.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';

const routes: Routes = [
  { path: '',   redirectTo: '/pdf-gen', pathMatch: 'full' },
  {path: "pdf-gen", component: PdfGeneratorComponent},
  {path: "download", component: DownloadSectionComponent},
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
