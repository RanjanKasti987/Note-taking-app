import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { NoteService } from '../services/note.service';

interface Note {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'add-note',
  standalone: true,
  imports: [RouterOutlet, NgIf, AngularEditorModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class AddNoteComponent implements OnInit {
  title = '';
  content = '';
  color = 'yellow';
  newNote: Note = { id: 0, title: '', content: '' };
  noteForm: FormGroup;
  note: any;
  router = inject(Router);
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px', // Adjust default height as needed
    minHeight: '150px',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold'], // Example of hiding a button; adjust as needed
    ],
    // Enable/disable or configure toolbar options as needed
    toolbarPosition: 'top',
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private noteService: NoteService
  ) {
    this.noteForm = this.fb.group({
      title: [''],
      content: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.noteService.postNote(this.noteForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
