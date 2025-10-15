import { inject, Injectable } from '@angular/core';
import { auth } from './auth';
import { NewUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {
  authService = inject(auth);

  async register(user: NewUser) {
    const res = await fetch('https://agenda-api.somee.com/api/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.authService.token,
      },
      body: JSON.stringify(user)
    });
    return res.ok;
  }
}
