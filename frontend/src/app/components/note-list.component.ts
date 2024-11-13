import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NoteService } from '../services/note.service';
import { NgFor, SlicePipe } from '@angular/common';
import {
  FormControl,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

interface Note {
  _id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'note-list',
  templateUrl: './note-list.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, SlicePipe, ReactiveFormsModule],
})
export class NoteListComponent {
  notes: Note[] = [];
  noteList: Note[] = [];
  searchValue = new FormControl();

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe((data: any) => {
      this.notes = data;
      this.noteList = data;
    });

    this.searchValue.valueChanges
      .pipe(
        debounceTime(300), // Adjust debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.notes = this.noteList.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        ); // Filter notes on input change
      });
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note._id !== id);
    });
  }

  filterNotes(title: string) {
    console.log(title);
    if (!title) {
      return this.notes;
    }
    return this.notes.filter((note) =>
      note.title.toLowerCase().includes(title.toLowerCase())
    );
  }
}
