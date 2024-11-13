import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environmet';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  getNotes() {
    return this.httpClient.get(`${environment.BACKEND_URL}/notes`, {
      withCredentials: true,
    });
  }

  getNote(id: string) {
    return this.httpClient.get(`${environment.BACKEND_URL}/notes/${id}`, {
      withCredentials: true,
    });
  }

  postNote(note: { title: string; content: string }) {
    return this.httpClient.post(`${environment.BACKEND_URL}/notes`, note, {
      withCredentials: true,
    });
  }
  updateNote(id: string, note: { title: string; content: string }) {
    return this.httpClient.put(`${environment.BACKEND_URL}/notes/${id}`, note, {
      withCredentials: true,
    });
  }

  deleteNote(id: string) {
    return this.httpClient.delete(`${environment.BACKEND_URL}/notes/${id}`, {
      withCredentials: true,
    });
  }
}
