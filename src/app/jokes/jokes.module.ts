import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JokesRoutingModule } from './jokes-routing.module';
import { JokesMainComponent } from './pages/jokes-main/jokes-main.component';
import { SharedModule } from '@shared/shared.module';
import { JokesListComponent } from './components/jokes-list/jokes-list.component';
import { EditJokeComponent } from './pages/edit-joke/edit-joke.component';
import { JokeFormComponent } from './components/joke-form/joke-form.component';

@NgModule({
  declarations: [
    JokesMainComponent,
    JokesListComponent,
    EditJokeComponent,
    JokeFormComponent,
  ],
  imports: [CommonModule, JokesRoutingModule, SharedModule],
})
export class JokesModule {}
