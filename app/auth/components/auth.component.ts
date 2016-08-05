

import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../lib/auth.service';

declare var window: any;

@Component ({
    directives: [ROUTER_DIRECTIVES],
    selector: 'auth-main',
    templateUrl: 'app/auth/static/html/auth.component.html'
})
export class AuthComponent implements OnInit {

    public checkComplete = false;

    constructor ( private authService : AuthService, private router: Router ) {}

    ngOnInit ()
    {

        var self = this;

        if ( window.localStorage.hasOwnProperty ( 'jfmToken' ) )
        {
            this.authService.setToken (
                window.localStorage.getItem ( 'jfmToken' ) );
            this.authService.checkUser ()
                .then ( function ( username )
                {
                    let link = [ '/main' ];
                    self.router.navigate ( link );
                })
                .catch ( function ( err )
                {
                    self.checkComplete = true;
                });
        }
        else self.checkComplete = true;
    }
};
