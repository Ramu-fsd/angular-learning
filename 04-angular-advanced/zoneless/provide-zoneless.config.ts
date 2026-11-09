// Optional configuration for Angular versions that support zoneless change detection.
// Import this provider into the generated ApplicationConfig only after confirming
// compatibility with the Angular version installed in your workspace.
import { ApplicationConfig } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

export const zonelessConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection()]
};
