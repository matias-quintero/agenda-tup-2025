import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite-list-page',
  imports: [RouterModule],
  templateUrl: './favorite-list-page.html',
  styleUrl: './favorite-list-page.scss'
})
export class FavoriteListPage {
  router = inject(Router)
}
