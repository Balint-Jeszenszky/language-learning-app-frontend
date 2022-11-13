import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registered: EventEmitter<void> = new EventEmitter<void>();
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hasStudentAccount: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.name, this.email, this.password, this.confirmPassword, this.hasStudentAccount).subscribe({
      next: () => {
        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.snackBar.open('Successful registration', 'OK');
        this.registered.emit();
      },
      error: err => this.snackBar.open(err.error, 'OK', { duration: 5000 }),
    });
  }

}
