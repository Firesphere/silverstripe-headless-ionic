import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StaffPage} from '../pages/staff/staff';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ApolloModule} from 'apollo-angular';
import {ApolloClient, createNetworkInterface} from 'apollo-client';
import {printRequest} from 'apollo-client/transport/networkInterface';
import qs from 'qs';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql/',
    opts: {
        credentials: 'same-origin',
    },
});
networkInterface.use([{
    applyMiddleware(req, next) {
        const entries = printRequest(req.request);

        // eslint-disable-next-line no-param-reassign
        req.options.headers = Object.assign(
            {},
            req.options.headers,
            {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        );
        // eslint-disable-next-line no-param-reassign
        req.options.body = qs.stringify(Object.assign(
            {},
            entries,
            {variables: JSON.stringify(entries.variables)}
        ));
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
        StaffPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        ApolloModule.forRoot(provideClient)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        StaffPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);