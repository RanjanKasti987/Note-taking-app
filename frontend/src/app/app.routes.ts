import { Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list.component';
import { NoteDetailComponent } from './components/note-detail';
import { AddNoteComponent } from './components/add-note.component';
import { EditNoteComponent } from './components/edit-note.component';

export const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'create-note', component: AddNoteComponent },
  { path: 'note/:id/edit', component: EditNoteComponent },
  { path: 'note/:id', component: NoteDetailComponent },
];
