import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacto';
import { auth } from './auth';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(auth);
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  // lista de contactos en memoria */
  contactos:Contact[] = [];

  //crear un contacto
  async createContact(nuevoContacto:NewContact){
    const res = await fetch(this.URL_BASE,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer "+ this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });
      if(!res.ok) return;
      const resContact:Contact = await res.json();
      this.contactos.push(resContact);
      return resContact
  }

  // elimina un contacto segun id */
async deleteContact(id:number){
    const res = await fetch(this.URL_BASE+"/"+id, 
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    this.contactos = this.contactos.filter(contact => contact.id !== id);
    return true;
  }

  async editContact(contact:Contact){
    const res = await fetch(this.URL_BASE+"/"+contact.id, 
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(contact)
      });
    if(!res.ok) return;
    /** Actualizo la lista de leads locales para dejar el lead que actualice actualizado */
    this.contactos = this.contactos.map(oldContact =>{
      if(oldContact.id === contact.id) return contact;
      return oldContact
    })
    return contact;
  }

  // obtiene los contactos del backend */
  async getContacts(){
    const res = await fetch('https://agenda-api.somee.com/api/Contacts',
      {
        method: "GET",
        headers: {
          Authorization: "bearer "+this.authService.token
        }
      })
      if(res.ok){
        const resJson:Contact[] = await res.json()
        this.contactos = resJson
      }
  }
  
  /** Obtiene un contacto del backend */
  async getContactById(id:string | number){
    const res = await fetch(this.URL_BASE+"/"+id,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer "+this.authService.token
        }
      })
      if(res.ok){
        const resJson:Contact = await res.json()
        return resJson;
      }
      return null;
  }

  /** Marca/desmarca un contacto como favorito */
  async setFavourite(id:string | number ) {
    const res = await fetch(this.URL_BASE+"/"+id+"/favorite", 
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    /** Edita la lista actual de contactos reemplazando sólamente el favorito del que editamos */
    this.contactos = this.contactos.map(contact => {
      if(contact.id === id) {
        return {...contact, isFavorite: !contact.isFavorite};
      };
      return contact;
    });
    return true;
  }
}
