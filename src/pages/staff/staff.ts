import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const MemberList = gql`
  query { readMembers {
    Email: Email,
    Name: FirstName,
    Surname: Surname
}}`;

interface QueryResponse {
    Email;
    Name;
    Surname;
}

@Component({
    selector: 'page-staff',
    templateUrl: 'staff.html'
})
export class StaffPage implements OnInit {
    data: any;
    loading: boolean;
    token: string;

    constructor(public navCtrl: NavController, private apollo: Apollo) {
        this.loading = true;
        this.token = window.localStorage.getItem('token');
    }

    ngOnInit() {
        this.data = this.apollo.watchQuery<QueryResponse>({
            query: MemberList
        });
        this.loading = false;
    }

    doRefresh = function (refresher) {
        this.loading = true;
        this.data.refetch();
        refresher.complete();
        this.loading = false;
    };

}
