import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      error: err => this.snackBar.open(err.error, 'OK', { duration: 5000 }),
    });
  }

}
