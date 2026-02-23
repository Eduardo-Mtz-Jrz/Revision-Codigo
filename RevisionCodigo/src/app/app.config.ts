import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core'; //
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para que funcione [(ngModel)]

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(FormsModule) // <--- Agrega esta línea aquí
  ]
};
