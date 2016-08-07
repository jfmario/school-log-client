
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from './auth/lib/auth.service';
import { EditStudentService } from './school-log/lib/edit-student.service';
import { SchoolLogService } from './school-log/lib/school-log.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [ AuthService, EditStudentService, SchoolLogService ],
    selector: 'my-app',
    templateUrl: 'app/global/static/html/app.component.html'
})
export class AppComponent { }
