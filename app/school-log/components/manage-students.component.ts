
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';
import { EditStudentService } from '../lib/edit-student.service';
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
        private editStudentService: EditStudentService,
        private schoolLogService: SchoolLogService )
    {
        super ( authService, router );
    }

    edit ( student: Child )
    {
        this.editStudentService.currentStudent = student;
        this.router.navigate ( ['/edit-student'] );
    }

    delete ( studentName: String, studentId: String )
    {
        var verify = confirm ( "Delete " + studentName + '?' );
        if ( verify )
            this.schoolLogService.deleteChild (
                this.authService.getToken (), studentId );
        else {}
    }

    ngDoCheck ()
    {
        this.children = this.schoolLogService.children;
    }
}
