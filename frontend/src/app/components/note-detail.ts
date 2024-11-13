import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NoteService } from '../services/note.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  templateUrl: './note-detail.html',
  imports: [RouterOutlet, NgIf],
})
export class NoteDetailComponent implements OnInit {
  note: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.noteService.getNote(params['id']).subscribe((note) => {
        this.note = note;
      });
    });
  }
}
