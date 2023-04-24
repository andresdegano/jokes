import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Output() darkModeChange = new EventEmitter<boolean>();

  user?: { name: string } | null;
  loggedIn$: Observable<any> = of(null);
  toggleControl = new FormControl(false);

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.darkModeChange.emit(!!darkMode);
    });
    this.loggedIn$ = this.authService.isLoggedInSubject;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
