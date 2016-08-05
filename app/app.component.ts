
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from './auth/lib/auth.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService],
    selector: 'my-app',
    templateUrl: 'app/global/static/html/app.component.html'
})
export class AppComponent { }
