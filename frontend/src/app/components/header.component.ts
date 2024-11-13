import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() profile: any;

  @Output() clearProfile = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleLogout(): void {
    this.authService.logout();
    this.clearProfile.emit();
  }
}
