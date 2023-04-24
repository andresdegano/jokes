import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokesMainComponent } from './pages/jokes-main/jokes-main.component';
import { EditJokeComponent } from './pages/edit-joke/edit-joke.component';

const routes: Routes = [
  {
    path: '',
    component: JokesMainComponent,
  },
  {
    path: 'joke/edit/:id',
    component: EditJokeComponent,
  },
  {
    path: 'joke/new',
    component: EditJokeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JokesRoutingModule {}
