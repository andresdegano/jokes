import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Joke, PaginatedJokes } from '@shared/models/jokes.model';
import { MatSort, Sort } from '@angular/material/sort';
import { distinctUntilChanged } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-jokes-list',
  templateUrl: './jokes-list.component.html',
  styleUrls: ['./jokes-list.component.scss'],
})
export class JokesListComponent {
  isMobile: boolean = false;
  @Input() jokes?: PaginatedJokes | null;

  @Output() onSelectJoke = new EventEmitter<Joke>();
  @Output() onPaginationChange = new EventEmitter<PageEvent>();
  @Output() onSortChange = new EventEmitter<Sort>();

  dataSource = new MatTableDataSource<Joke>([]);
  readonly breakpoint$ = this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .pipe(distinctUntilChanged());

  constructor(private breakpointObserver: BreakpointObserver) {}

  private breakpointChanged() {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 800px)');
  }
  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'jokes') {
          this.dataSource.data = changes[propName].currentValue?.jokes;
        }
      }
    }
  }

  getViewsColor(views: number) {
    return views < 26
      ? '!text-red-600'
      : views < 51
      ? '!text-orange-600'
      : views < 76
      ? '!text-yellow-600'
      : '!text-green-600';
  }
}
