import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { BankingHomeComponent } from './banking-home.component';

bootstrapApplication(BankingHomeComponent, appConfig)
  .catch((error: unknown) => console.error('Application bootstrap failed', error));
