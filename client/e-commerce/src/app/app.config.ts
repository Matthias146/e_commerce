import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideLucideIcons } from '@lucide/angular';
import { environment } from '../environments/environment';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideLucideIcons(),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.audience,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/api/account/*',
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience,
              },
            },
          },
          {
            uri: 'http://localhost:8080/api/orders/my/*',
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience,
              },
            },
          },
        ],
      },
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
  ],
};
