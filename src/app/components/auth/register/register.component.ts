import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.name, this.email, this.password, this.confirmPassword).subscribe({
      next: res => console.log('Success:', res),
      error: err => console.error('Fail:', err),
    });
  }

}
