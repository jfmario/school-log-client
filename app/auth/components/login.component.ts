
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../lib/auth.service';

@Component ({
    selector: 'auth-login',
    templateUrl: 'app/auth/static/html/login.component.html'
})
export class LoginComponent implements DoCheck {

    public failedAttempt = false;
    public newlyRegistered = false;
    public userObj: any = {};

    constructor ( private authService : AuthService, private router: Router ) {}

    login ()
    {
        var self = this;
        this.authService.login ( this.userObj.username,
            this.userObj.password )
            .then ( function ( token )
            {

                if ( !token )
                {
                    self.failedAttempt = true;
                    return;
                }
                console.log ( "Login successful" );
                console.log ( token );

                let link = [ '/main' ];
                self.router.navigate ( link );
            })
            .catch ( console.error );
    }

    ngDoCheck ()
    {
        if ( this.authService.justRegistered ) this.newlyRegistered = true;
    }
}
