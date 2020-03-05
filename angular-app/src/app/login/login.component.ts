import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../modules/auth/services/user.service';
import {User} from '../../modules/auth/models';
import { TransactionRRService } from '../TransactionRR/TransactionRR.service';
import { UserContext } from '../org.decentralized.energy.network';
import { UserTransactioncacheService } from 'app/user-transactioncache.service';

@Component({ templateUrl: 'login.component.html',
            providers: [TransactionRRService] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user:User;
    userInfo:UserContext

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private serviceTransaction:TransactionRRService,
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.user = {
            id: '',
            firstName: this.f.username.value,
            lastName: '',
            email: '',
        };
        this.serviceTransaction.getUserInfo(this.f.username.value).subscribe((usercontext :UserContext)=>{
            console.log("userContext",usercontext);
            UserTransactioncacheService.userCoins
            UserTransactioncacheService.userEnergy
        })
        this.serviceTransaction.getUserInfo(this.f.username.value)
        UserService.user=this.user;
        console.log(this.f.username.value);
        this.router.navigate(['/dashboard']);
        this.loading = true;
    }
}
