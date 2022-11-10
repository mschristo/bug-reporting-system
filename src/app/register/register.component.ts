import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('dev', Validators.required),
  });

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
      .subscribe({
        next: result => {
          if (result.accessToken) {
            this.router.navigateByUrl('home');
          }
        },
        error: error => alert(error)
      });
    }
  }

}
