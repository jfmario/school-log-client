
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_SETTINGS } from '../data/settings.data';
import { AuthService } from '../lib/auth.service';

@Component ({
    selector: 'auth-register',
    templateUrl: 'app/auth/static/html/register.component.html'
})
export class RegisterComponent {

    public userObj: any = {};

    constructor ( private authService : AuthService, private router: Router ) {}

    register ()
    {
        var self = this;
        this.authService.register ( this.userObj.username,
            this.userObj.password,
            this.userObj.emailAddress )
            .then ( function ( status )
            {
                console.log ( 'Registration successful' );
                let link = [ '/login' ];
                self.router.navigate ( link );
            })
            .catch ( console.error );
    }
};
