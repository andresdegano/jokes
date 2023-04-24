import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JokesService } from '@jokes/services/jokes.service';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { Joke, JokeModel } from '@shared/models/jokes.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-joke',
  templateUrl: './edit-joke.component.html',
  styleUrls: ['./edit-joke.component.scss'],
})
export class EditJokeComponent implements OnInit {
  id: string | null = null;
  newJoke?: JokeModel;
  title = 'Add your Joke!';
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jokesService: JokesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isLoading = true;
      this.title = 'Edit your Joke!';
      this.jokesService
        .getJokeById(this.id)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((joke) => {
          this.newJoke = joke;
        });
    }
  }

  save() {
    this.isLoading = true;
    const saveJoke$ = this.id
      ? this.jokesService.updateJoke({ ...this.newJoke!, id: this.id })
      : this.jokesService.createJoke(this.newJoke!);
    saveJoke$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.goHome();
      });
  }

  onRemove() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Joke',
        subtitle: `Are you sure you want to delete ${this?.newJoke?.Title}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.jokesService
          .deleteJoke(this.id!)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(async () => {
            this.goHome();
          });
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
