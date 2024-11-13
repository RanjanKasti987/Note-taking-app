import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AngularEditorComponent,
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { NoteService } from '../services/note.service';
import { Router, RouterOutlet } from '@angular/router';

interface Note {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterOutlet, NgIf, AngularEditorModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  title = '';
  content = '';
  color = 'yellow';
  newNote: Note = { id: 0, title: '', content: '' };
  noteForm: FormGroup;
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
