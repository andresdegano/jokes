import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { JokesService } from '@jokes/services/jokes.service';
import { Joke, PaginatedJokes } from '@shared/models/jokes.model';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  finalize,
  lastValueFrom,
  of,
  tap,
} from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-jokes-main',
  templateUrl: './jokes-main.component.html',
  styleUrls: ['./jokes-main.component.scss'],
})
export class JokesMainComponent implements OnInit {
  jokes$: Observable<PaginatedJokes> = of({
    jokes: [],
    page: 0,
    limit: 10,
    total: 0,
    sortBy: 'CreatedAt',
    order: 'desc',
    query: '',
  });
  error = false;
  isLoading = true;
  form = new FormGroup({
    query: new FormControl(''),
  });

  constructor(
    private router: Router,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this.loadData(0, 10, 'CreatedAt', 'desc', '');
    this.form.valueChanges.subscribe(async (value) => {
      const currentData = await lastValueFrom(this.jokes$);
      this.loadData(
        currentData.page,
        currentData.limit,
        currentData.sortBy,
        currentData.order,
        value.query || ''
      );
    });
  }

  loadData(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
    query: string
  ) {
    this.isLoading = true;
    this.error = false;
    this.jokes$ = this.jokesService
      .getJokes(page, limit, sortBy, order, query)
      .pipe(
        catchError(() => {
          this.error = true;
          return of();
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );
  }

  async onPaginationChange(paginationData: PageEvent) {
    const currentData = await lastValueFrom(this.jokes$);
    this.loadData(
      paginationData.pageIndex,
      paginationData.pageSize,
      currentData.sortBy,
      currentData.order,
      currentData.query
    );
  }

  async onSortChange(sortData: Sort) {
    const currentData = await lastValueFrom(this.jokes$);
    this.loadData(
      currentData.page,
      currentData.limit,
      sortData.active,
      sortData.direction,
      currentData.query
    );
  }

  onEdit(joke: Joke) {
    this.router.navigateByUrl(`/joke/edit/${joke.id}`);
  }
}
