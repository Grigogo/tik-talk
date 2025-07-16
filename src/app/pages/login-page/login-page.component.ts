import {Component, inject} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {
    AuthService
} from '../../../../../../Documents/Tik-talk/src/app/auth/auth.service';

@Component({
    selector: 'app-login-page',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
    authService = inject(AuthService);

    form = new FormGroup({
        username: new FormControl<string | null>(null, Validators.required),
        password: new FormControl<string | null>(null, Validators.required),
    })

    onSubmit() {
        console.log(this.form.value);

        if (this.form.valid) {
            //@ts-ignore
            this.authService.login(this.form.value)
                .subscribe()
        }

    }
}
