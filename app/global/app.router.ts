
import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthComponent } from '../auth/components/auth.component';
import { LandingComponent } from '../auth/components/landing.component';
import { LoginComponent } from '../auth/components/login.component';
import { LogoutComponent } from '../auth/components/logout.component';
import { RegisterComponent } from '../auth/components/register.component';
import { AboutComponent } from '../school-log/components/about.component';
import { EditEntryComponent } from '../school-log/components/edit-entry.component';
import { EditStudentComponent } from '../school-log/components/edit-student.component';
import { ManageStudentsComponent } from '../school-log/components/manage-students.component';
import { NewStudentComponent } from '../school-log/components/new-student.component';
import { QueryComponent } from '../school-log/components/query.component';

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
    {
        component: ManageStudentsComponent,
        path: 'students'
    },
    {
        component: EditStudentComponent,
        path: 'edit-student'
    },
    {
        component: NewStudentComponent,
        path: 'newstudent'
    },
    {
        component: QueryComponent,
        path: 'query'
    },
    {
        component: EditEntryComponent,
        path: 'edit-entry'
    },
    {
        component: AboutComponent,
        path: 'about'
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
        component: LogoutComponent,
        path: 'logout'
    },
    {
        component: RegisterComponent,
        path: 'register'
    }
];

export const appRouterProviders = [
    provideRouter ( routes )
];
