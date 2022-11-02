import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './Pages/addbook/addbook.component';
import { HomeComponent } from './Pages/home/home.component';
import { UpdatebookComponent } from './Pages/updatebook/updatebook.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addbook', component: AddbookComponent },
  { path: 'updatebook', component: UpdatebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
