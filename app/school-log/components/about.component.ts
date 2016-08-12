
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';

@Component({
    selector: 'school-log-about',
    templateUrl: 'app/school-log/static/html/about.component.html'
})
export class AboutComponent extends AuthCheckAbstractComponent {
    constructor ( protected authService: AuthService, protected router: Router )
    {
        super ( authService, router );
    }
};
