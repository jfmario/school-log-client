
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';
import { SchoolLogService } from '../lib/school-log.service';
import { Entry } from '../models/entry.model';
import { EntryQuery } from '../models/entry.query';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'school-log-query',
    templateUrl: 'app/school-log/static/html/query.component.html'
})
export class QueryComponent  extends AuthCheckAbstractComponent {
    
    public entries: Entry[] = [];
    public query: EntryQuery = new EntryQuery ();
    
    constructor ( protected authService: AuthService, protected router: Router,
        private schoolLogService: SchoolLogService )
    {
        super ( authService, router );
    }
    
    ngOnInit ()
    {
        this.query.children = [];
        this.query.dateMin = null;
        this.query.dateMax = null;
        this.query.description = [];
        this.query.hoursMin = 0;
        this.query.hoursMax = 0;
        this.query.subject = [];
        var self = this;
        this.schoolLogService.queryEntries ( this.authService.getToken (),
            this.query )
            .then ( function ( data )
            {
                self.entries = data as Entry [];
            });
    }
}