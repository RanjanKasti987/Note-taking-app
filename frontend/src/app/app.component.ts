import { Component, Inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NoteService } from './services/note.service';
import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { routes } from './app.routes';
import { NoteListComponent } from './components/note-list.component';
import { AddNoteComponent } from './components/add-note.component';
import { EditNoteComponent } from './components/edit-note.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environmet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    HeaderComponent,
    NgSwitchCase,
    AppComponent,
    NoteListComponent,
    AddNoteComponent,
    EditNoteComponent,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {}
  profile: any = null;
  isLoggingLoading = false;
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggingLoading = true;
    this.authService.checkAuth().subscribe({
      next: () => {
        this.authService.getMe().subscribe({
          next: (data: any) => {
            this.profile = data;
            this.isLoggedIn = true;
            this.isLoggingLoading = false;
          },
          error: () => {
            this.clearProfile();
            this.isLoggingLoading = false;
          },
        });
      },
      error: () => {
        this.clearProfile();
        this.isLoggingLoading = false;
      },
    });
  }

  handleLogin() {
    window.location.href = `${environment.BACKEND_URL}/auth/github`;
  }

  handleLogout() {
    this.authService.logout();
  }

  clearProfile() {
    this.profile = null;
    this.isLoggedIn = false;
  }
}
