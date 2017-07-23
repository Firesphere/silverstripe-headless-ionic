import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const MemberList = gql`
  query { readMembers { edges { node {
    Email
    FirstName
    Surname
  }}}}
`;

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
    staffMembers: any;
    loading: boolean;
    token: string;

    constructor(public navCtrl: NavController, private apollo: Apollo) {
        this.loading = true;
        this.token = window.localStorage.getItem('token');
    }

    ngOnInit() {
      const self = this;
      this.apollo.watchQuery<QueryResponse>({
          query: MemberList
      }).subscribe(function (result) {
          self.staffMembers = (result.data as any).readMembers.edges.map(edge => edge.node);
          self.loading = false;
      });
    }

    doRefresh = function (refresher) {
        this.loading = true;
        this.data.refetch();
        refresher.complete();
        this.loading = false;
    };

}
