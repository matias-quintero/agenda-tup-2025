import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactListPage } from './pages/contact-list-page/contact-list-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyUserGuard} from './guards/only-user-guard-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';
import { onlyPublicGuard } from './guards/only-public-guard-guard';
import { FavoriteListPage } from './pages/favorite-list-page/favorite-list-page';

export const routes: Routes = [
    {
        path:"login",
        component: LoginPage,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicGuard]
    },
    {
        // Path vacío se abre cuando la página no tiene url más que localhost
        path:"",
        component: LoggedLayout,
        canActivateChild: [onlyUserGuard],
        children: [
            {
                path:"",
                component: ContactListPage
            },
            {
                path:"contacts/:idContacto",
                component: ContactDetailsPage
            }, 
            {
                path: "contact/new",
                component: NewEditContact
            },
            {
                path: "contacts/:idContacto/edit",
                component: NewEditContact
            },
            {
                path:"contact/favorites",
                component: FavoriteListPage
            }
        ]
    },
];
