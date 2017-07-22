import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {SQLite} from '@ionic-native/sqlite'
// Pages
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StaffPage} from '../pages/staff/staff';
import {ModalPage} from '../helpers/login';
import {RegisterPage} from '../pages/register/register';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ApolloModule} from 'apollo-angular';
import {ApolloClient, createNetworkInterface} from 'apollo-client';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql/',
    opts: {
        credentials: 'same-origin',
    },
});
// copied from CMS to get the GraphQL working. Needs a bit of rework
networkInterface.use([{
    applyMiddleware(req, next) {
        const token = localStorage.getItem('token');
        // eslint-disable-next-line no-param-reassign
        req.options.headers = Object.assign(
            {},
            req.options.headers,
            {
                'Authorization': token ? `Bearer ${token}` : null,
                'Content-Type': 'application/json;charset=UTF-8',
            }
        );
        next();
    },
}]);

const client = new ApolloClient({
    networkInterface,
});

export function provideClient(): ApolloClient {
    return client;
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        StaffPage,
        ModalPage,
        RegisterPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'bottom'
        }),
        ApolloModule.forRoot(provideClient),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        StaffPage,
        ModalPage,
        RegisterPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}