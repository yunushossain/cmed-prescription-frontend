import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, LoginPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;
  error = '';

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: (payload: LoginPayload) => {
        // Backend returns: { token: string, username?: string }
        const token = payload?.token;
        if (!token) {
          this.error = 'No token returned from server';
          this.loading = false;
          return;
        }
        this.auth.saveToken(token);
        
        this.router.navigate(['/prescriptions']);
      },
      error: err => {
        this.error = err?.error?.message || 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
