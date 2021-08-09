import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsComponent } from './pages/errors/errors.component';
import { HomeComponent } from './pages/home/home.component';
import { NewOffersComponent } from './pages/new-offers/new-offers.component';
import { OffersEditComponent } from './pages/offers-edit/offers-edit.component';
import { OffersComponent } from './pages/offers/offers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new-offers', component: NewOffersComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'offers/edit/:id', component: OffersEditComponent },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
