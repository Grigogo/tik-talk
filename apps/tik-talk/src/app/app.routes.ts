import { Routes } from '@angular/router';
import { LoginPageComponent, canActivateAuth } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import {
  SearchPageComponent,
  ProfilePageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { FormExperimentComponent } from './lib/experimental/form-experiment/form-experiment.component';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects, profileFeature } from '@tt/data-access';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
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
