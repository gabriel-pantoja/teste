import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.constructorForm();
    this.formValidators();
  }

  constructorForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  formValidators(): void {
    this.loginForm.controls['email'].setValidators([Validators.required, Validators.email]);
    this.loginForm.controls['password'].setValidators([Validators.required]);
  }

  getErrorMessageEmail(): string {
    if (this.loginForm.controls['email'].hasError('email')) {
      return 'E-mail inválido';
    } else if (this.loginForm.controls['email'].hasError('required')) {
      return 'E-mail obrigatório';
    } else if (this.loginForm.controls['email'].hasError('unauthorized')) {
      return 'Dados inválidos';
    }

    return '';
  }

  getErrorMessagePassword(): string {
    if (this.loginForm.controls['password'].hasError('required')) {
      return 'Password obrigatório';
    } else if (this.loginForm.controls['password'].hasError('unauthorized')) {
      return 'Dados inválidos';
    }

    return '';
  }

  onSubmit(): void {
    // if (!this.loginForm.valid) {
    //   return;
    // }
    // this.loginService.login(this.loginForm.value).subscribe(res => {

    // }, err => {
    //   if (err.status === 401) {
    //     this.loginForm.controls['email'].setErrors({ unauthorized: true });
    //     this.loginForm.controls['password'].setErrors({ unauthorized: true });
    //   }
    // }, () => {
    this.router.navigate(['home']);
    //});
  }

}
