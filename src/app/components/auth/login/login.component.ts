import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      error: err => console.error('Fail:', err),
    });
  }

}
