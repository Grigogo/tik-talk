import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { SearchPageComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/common-ui';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { FormExperimentComponent } from './lib/experimental/form-experiment/form-experiment.component';
import { ProfilePageComponent } from '@tt/profile';
import { canActivateAuth } from '@tt/auth';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      {
        path: 'chats-page',
        loadChildren: () => chatsRoutes,
      },
      { path: 'forms', component: FormExperimentComponent },
    ],
    canActivate: [canActivateAuth],
  },

  { path: 'login', component: LoginPageComponent },
];
