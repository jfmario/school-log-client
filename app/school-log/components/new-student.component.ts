
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';
import { SchoolLogService } from '../lib/school-log.service';
import { Child } from '../models/child.model';

@Component ({
    directives: [ROUTER_DIRECTIVES],
    selector: 'school-log-new-student',
    templateUrl: 'app/school-log/static/html/new-student.component.html'
})
export class NewStudentComponent extends AuthCheckAbstractComponent {

    public child: Child;

    constructor ( protected authService: AuthService, protected router: Router,
        private schoolLogService: SchoolLogService )
    {
        super ( authService, router );
    }

    private resetStudent ()
    {
        this.child = new Child( '', 5, 1 );
        this.child.age = 5;
        this.child.grade = 1;
        this.child.name = '';
    }

    cancel ()
    {
        this.router.navigate ( ['/students'] );
    }
    saveStudent ()
    {
        var self = this;
        this.schoolLogService.createChild ( this.authService.getToken (),
            this.child ).then ( function ()
            {
                self.schoolLogService.getChildren (
                    self.authService.getToken () );
                self.router.navigate ( ['/students'] );
            });
    }

    ngOnInit ()
    {
        this.resetStudent ();
    }
}
