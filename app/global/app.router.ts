
import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthComponent } from '../auth/components/auth.component';
import { LandingComponent } from '../auth/components/landing.component';
import { LoginComponent } from '../auth/components/login.component';
import { RegisterComponent } from '../auth/components/register.component';

const routes: RouterConfig = [
    {
        component: LandingComponent,
        path: ''
    },
    // main application
    // the main path is where all logins will be redirected
    {
        component: LandingComponent,
        path: 'main'
    },
    // authentication
    {
        component: AuthComponent,
        path: 'auth'
    },
    {
        component: LoginComponent,
        path: 'login'
    },
    {
        component: RegisterComponent,
        path: 'register'
    }
];

export const appRouterProviders = [
    provideRouter ( routes )
];
