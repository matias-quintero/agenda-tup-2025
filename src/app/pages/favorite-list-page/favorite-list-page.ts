import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { auth } from '../../services/auth';
import { ContactsService } from '../../services/contacts-service';
import { ContactListItem } from "../../components/contact-list-item/contact-list-item";

@Component({
  selector: 'app-favorite-list-page',
  imports: [RouterModule, ContactListItem],
  templateUrl: './favorite-list-page.html',
  styleUrl: './favorite-list-page.scss'
})
export class FavoriteListPage {
  router = inject(Router)

  ngOnInit(): void {
      this.contactsService.getContacts();
    }
  
    authService = inject(auth)
    contactsService = inject(ContactsService)
}
