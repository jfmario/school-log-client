import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders } from './global/app.router';
import { AuthService } from './auth/lib/auth.service';
import { AppComponent } from './app.component';

bootstrap ( AppComponent, [ appRouterProviders, HTTP_PROVIDERS,
    { provide: AuthService } ] );
