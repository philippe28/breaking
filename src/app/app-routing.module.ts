import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HomeComponent} from './home/home.component'
import {EpisodesComponent} from './episodes/episodes.component'
import {SuggestionComponent} from './suggestion/suggestion.component'

// const routes: Routes = [];

const routes: Routes = [
  { path: '', redirectTo: '/personagens', pathMatch: 'full' },
  { path: 'personagens', component: HomeComponent },
  { path: 'episodios', component: EpisodesComponent },
  { path: 'sugestao', component: SuggestionComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
