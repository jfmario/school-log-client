
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';
import { SchoolLogService } from '../lib/school-log.service';
import { Child } from '../models/child.model';

@Component ({
    directives: [ROUTER_DIRECTIVES],
    selector: 'school-log-manage-students',
    templateUrl: 'app/school-log/static/html/manage-students.component.html'
})
export class ManageStudentsComponent extends AuthCheckAbstractComponent implements DoCheck {

    public children: Child[] = [];

    constructor ( protected authService: AuthService, protected router: Router,
        private schoolLogService: SchoolLogService )
    {
        super ( authService, router );
    }

    ngDoCheck ()
    {
        this.children = this.schoolLogService.children;
    }
}
