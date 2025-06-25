import { MessageService } from 'primeng/api';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, Provider } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { myloadingInterceptor } from './core/interceptors/myloading.interceptor';
// import { Loding } from './core/interceptors/loading.interceptors';




export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([myloadingInterceptor])),
    // importProvidersFrom(HttpClientModule),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
  ],
};
