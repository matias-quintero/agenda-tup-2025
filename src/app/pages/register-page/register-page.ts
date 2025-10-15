import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FromUser } from '../../interfaces/user';
import { UsersServices } from '../../services/users-services';
@Component({
  selector: 'app-register-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  isLoading = false;
  errorRegister = false;

  userService = inject(UsersServices);

  async register(form: FromUser){
    console.log(form);
    
    this.errorRegister = false;
    if (!form.firstName) {
      console.log('register error: missing firstname');
      this.errorRegister = true;
      return;
    }
    if (!form.lastName) {
      console.log('register error: missing lastname');
      this.errorRegister = true;
      return;
    }
    if (!form.email) {
      console.log('register error: missing email');
      this.errorRegister = true;
      return;
    }
    if (!form.password) {
      console.log('register error: missing password');
      this.errorRegister = true;
      return;
    }
    if (!form.password2) {
      console.log('register error: missing password confirmation');
      this.errorRegister = true;
      return;
    }
    if (form.password !== form.password2) {
      console.log('register error: passwords do not match');
      this.errorRegister = true;
      return;
    }

    this.isLoading = true;
    const ok = await this.userService.register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password
    });
    this.isLoading = false;
    // }
  }
}
