import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading=false; error='';
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(){
    if (this.form.invalid) return;
    this.loading = true; this.error='';
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: res => { this.auth.saveToken(res.token); this.router.navigate(['/']); },
      error: err => { this.error = err?.error?.message || 'Invalid credentials'; this.loading=false; }
    });
  }
}
