import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts-service';
import { Router } from '@angular/router';
import { Contact, NewContact } from '../../interfaces/contacto';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorEnBack = false;
  idContacto = input<string>();
  contactoBack: Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm")
  
  async ngOnInit() {
    if(this.idContacto()){
      const contacto:Contact|null = await this.contactsService.getContactById(this.idContacto()!);
      if(contacto){
        this.contactoBack = contacto;
        this.form()?.setValue({
          address: contacto.address,
          company: contacto.company,
          email: contacto.email,
          firstName:contacto.firstName,
          image:contacto.image,
          isFavorite:contacto.isFavorite,
          lastName: contacto.lastName,
          number: contacto.number,
          // description: contacto.description
        })
      }
    }
  }

  async handleFormSubmission(form:NgForm){
    this.errorEnBack = false;
    const nuevoContacto: NewContact ={
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite,
      // description: form.value.isFavorite
    }

    let res;
    if(this.idContacto()){
      res = await this.contactsService.editContact({...nuevoContacto,id:this.contactoBack!.id});
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }

    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/contacts",res.id]);
  }
}
