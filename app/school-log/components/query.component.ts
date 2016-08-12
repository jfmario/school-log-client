
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../../auth/lib/auth.service';
import { AuthCheckAbstractComponent } from '../../auth/middleware/auth-check.abstract.component';
import { SchoolLogService } from '../lib/school-log.service';
import { Child } from '../models/child.model';
import { Entry } from '../models/entry.model';
import { EntryQuery } from '../models/entry.query';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'school-log-query',
    templateUrl: 'app/school-log/static/html/query.component.html'
})
export class QueryComponent extends AuthCheckAbstractComponent implements DoCheck {

    public entries: Entry[] = [];
    public entrySaved: Boolean = false;
    public newEntry: Entry = new Entry ();
    public query: EntryQuery = new EntryQuery ();
    public students: Child[] = [];

    constructor ( protected authService: AuthService, protected router: Router,
        private schoolLogService: SchoolLogService )
    {
        super ( authService, router );
    }

    public submitNewEntry ()
    {
        this.entrySaved = false;
        var self = this;
        this.schoolLogService.createEntry ( this.authService.getToken (),
            this.newEntry )
            .then ( function ()
            {
                self.entrySaved = true;
                self.newEntry.description = '';
                self.schoolLogService.queryEntries (
                    self.authService.getToken (), self.query )
                    .then ( function ( data )
                    {
                        self.entries = data as Entry [];
                    });
            });
    }
    public submitQuery ()
    {
        var self = this;
        this.schoolLogService.queryEntries ( this.authService.getToken (),
            this.query )
            .then ( function ( data )
            {
                self.entries = data as Entry [];
            });
    }

    ngOnInit ()
    {
        this.query.children = [];
        this.query.dateMin = null;
        this.query.dateMax = null;
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
    ngDoCheck ()
    {
        this.students = this.schoolLogService.children;
    }
}
