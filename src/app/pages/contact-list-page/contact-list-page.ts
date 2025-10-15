import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact, NewContact } from '../../interfaces/contacto';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule, NgForm} from '@angular/forms';
import { auth } from '../../services/auth';


@Component({
  selector: 'app-contact-list-page',
  imports: [RouterModule,ContactListItem, FormsModule],
  templateUrl: './contact-list-page.html',
  styleUrl: './contact-list-page.scss'
})

export class ContactListPage implements OnInit {

  ngOnInit(): void {
    this.contactsService.getContacts();
  }

  authService = inject(auth)
  contactsService = inject(ContactsService)

}


