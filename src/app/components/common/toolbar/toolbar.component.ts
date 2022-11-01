import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  logout() {
    this.authService.logout();
  }

}
