
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../lib/auth.service';

/**
 * Abstract class uses ngOnInit to demand actively logged in user.
 */
export class AuthCheckAbstractComponent implements OnInit {

    public currentUser: String = null;

    constructor ( protected authService : AuthService, protected router: Router ) {}

    ngOnInit ()
    {
        if ( !this.authService.currentUser )
        {
            let link = ['/auth'];
            this.router.navigate ( link );
        }
        else this.currentUser = this.authService.currentUser;
    }
}
