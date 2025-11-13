import { canActivateAuth } from './lib/auth/acces.guard';
import { authTokenInterceptor } from './lib/auth/auth.interceptor';
import { AuthService } from '../../data-access/src/lib/auth/services/auth.service';

export * from './lib/feature-auth';

export { canActivateAuth, authTokenInterceptor, AuthService };
