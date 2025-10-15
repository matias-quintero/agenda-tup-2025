import { Component, inject, input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { auth } from '../../services/auth';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(auth);

  showLogoutModal(){
    Swal.fire({
      title: "¿Quiere cerrar sesión?",
      showDenyButton: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "var(--color-violeta)",
      confirmButtonText: `Cerrar sesión`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.authService.logout();
      } 
    });
  }
}
