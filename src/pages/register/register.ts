import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import {StaffPage} from '../staff/staff';
import gql from 'graphql-tag';

const member = gql`
          mutation createMember($Email: String!, $Password: String!){
          createMember(Email: $Email, Password: $Password) {
              ID,
              Token,
              FirstName
          }
        }`;

@Component({
    templateUrl: 'register.html'
})
export class RegisterPage {
    private register: FormGroup;
    protected data: any;

    constructor(public platform: Platform,
                public params: NavParams,
                public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private apollo: Apollo) {
        this.register = this.formBuilder.group({
            username: ['Error', Validators.required],
            password: ['Error', Validators.required],
        });
    }

    registerForm() {
        const name = this.register.value['username'];
        const pass = this.register.value['password'];
        window.localStorage.removeItem('token');
        this.apollo.mutate({
            mutation: member,
            variables: {
                Email: name,
                Password: pass
            }
        }).subscribe(({data}) => {
            window.localStorage.setItem('token', data['createMember']['Token']);
            this.navCtrl.push(StaffPage);
        });
    }
}