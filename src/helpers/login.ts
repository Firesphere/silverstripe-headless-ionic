import {Component} from '@angular/core';
import {Platform, NavParams, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
const member = gql`
          mutation createToken($Email: String!, $Password: String!){
          createToken(Email: $Email, Password: $Password) {
              ID,
              Token,
              FirstName
          }
        }`;
@Component({
    templateUrl: 'login.html'
})
export class ModalPage {
    private login: FormGroup;
    protected data: any;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController,
                private formBuilder: FormBuilder,
                private apollo: Apollo) {
        this.login = this.formBuilder.group({
            username: ['Error', Validators.required],
            password: ['Error', Validators.required],
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    loginForm() {
        const name = this.login.value['username'];
        const pass = this.login.value['password'];
        window.localStorage.removeItem('token');
        this.apollo.mutate({
            mutation: member,
            variables: {
                Email: name,
                Password: pass
            }
        }).subscribe(({data}) => {
            window.localStorage.setItem('token', data['createToken']['Token']);
            this.dismiss();
        });
    }
}