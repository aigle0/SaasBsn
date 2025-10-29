import {Component} from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {ApiConfiguration} from "../../services/api-configuration";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterModule,
        NgForOf,
        NgIf
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    authRequest: AuthenticationRequest = {email: '', password: ''};
    errorMsg: Array<string> = [];

    // constructor(private http: HttpClient) { }
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
    }

    login() {
        this.errorMsg = [];
        this.authService.authenticate({
            body: this.authRequest
        }).subscribe({
                next: (res) => {
                    //todo save the token
                    this.router.navigate(['books'])
                },
                error:(err)=>{
                    console.log(err);
                }
            }
        )
    }

    register() {
        this.router.navigate(['register']);
    }
}
