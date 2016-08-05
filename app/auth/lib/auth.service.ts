
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AUTH_SETTINGS } from '../data/settings.data';
import 'rxjs/add/operator/toPromise';

declare var jsSHA: any;
declare var window: any;

@Injectable()
export class AuthService {

    private baseUrl = 'http://ec2-54-191-90-8.us-west-2.compute.amazonaws.com/auth';
    private sessionsUrl = this.baseUrl + '/sessions';
    private usersUrl = this.baseUrl + '/users';
    public currentUser: String = null;
    private currentToken: String = null;

    public justRegistered: boolean = false;

    constructor ( private http: Http ) {}

    private getSha512 ( text: String )
    {
        var shaObj: any = new jsSHA ( 'SHA-512', 'TEXT' );
        shaObj.update ( text );
        return shaObj.getHash ( 'HEX' );
    }
    private handleError ( error: any ) {
        console.error ( 'An error occurred', error );
    }

    public getToken ()
    {
        return this.currentToken;
    }
    public setToken ( token: String ) { this.currentToken = token; }
    public hasToken ()
    {
        if ( this.currentToken ) return true;
        return false;
    }

    // HTTP methods
    public checkUser ()
    {
        var self = this;
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': this.currentToken
        });
        return this.http.get ( this.usersUrl, { headers: headers }).toPromise ()
            .then ( function ( response )
            {

                var responseData = response.json ();
                self.currentUser = responseData.username;

                return self.currentUser;
            })
            .catch ( this.handleError );
    }
    public login ( username: String, password: String )
    {

        var self = this;

        let headers = new Headers ({
            'Content-Type': 'application/json'
        });

        var postData: any = {
            password: this.getSha512 ( password + AUTH_SETTINGS.SALT ),
            username: username
        };
        return this.http.post ( this.sessionsUrl, JSON.stringify ( postData ),
            { headers: headers } ).toPromise ()
            .then ( function ( response )
            {
                self.currentToken = response.text ();
                window.localStorage.setItem ( 'jfmToken', self.currentToken );
                self.currentUser = postData.username;
                return self.currentToken;
            }).catch ( this.handleError );
    }
    public register ( username: String, password: String, emailAddress: String )
    {
        var self = this;
        let headers = new Headers ({
            'Content-Type': 'application/json'
        });
        var postData: any = {
            username: username,
            password: this.getSha512 ( password + AUTH_SETTINGS.SALT ),
            emailAddress: emailAddress
        };
        return this.http.post ( this.usersUrl, JSON.stringify ( postData ),
            { headers: headers } ).toPromise ()
            .then ( function ( response ) {

                self.justRegistered = true;

                return { success: true };
            })
            .catch ( this.handleError );
    }
    public updateInfo ( password: String, emailAddress: String )
    {

        var self = this;

        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': this.currentToken
        });

        var putData: any = {
            newEmailAddress: emailAddress,
            newPassword: password
        };
        return this.http.put ( this.usersUrl, JSON.stringify ( putData ),
            { headers: headers } ).toPromise ()
            .then ( function ( response )
            {
                return response.json ();
            }).catch ( this.handleError );
    }
}
