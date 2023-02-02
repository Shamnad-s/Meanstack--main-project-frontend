/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { EventsSearchComponent } from 'libs/event/src/lib/components/events-search/events-search.component';
import { UiModule } from '@angular-main-project/ui';
@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        HomePageComponent,
        EventsListComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        EventsSearchComponent
    ],
    imports: [
        BrowserModule,

        RouterModule.forRoot([
            {
                path: '',
                component: HomePageComponent
            },
            { path: 'event', component: EventsListComponent }
        ]),
        UiModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})
export class AppModule {}
