import { Component, inject } from '@angular/core';
import { Router, RouterModule, } from '@angular/router';
import { FormsModule, NgForm } from "@angular/forms";
import { auth } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(auth)
  router =  inject(Router)

  errorLogin = false

  async login(from:NgForm){
    console.log(from.value)
    this.errorLogin = false;
    if(!from.value.email || !from.value.password){
      this.errorLogin = true
      return
    }
    const loginResult = await this.authService.login(from.value);
    if(loginResult) this.router.navigate(["/"])
      this.errorLogin = true
  }

}

