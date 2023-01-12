import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, EventsListComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomePageComponent
            },
            { path: 'event', component: EventsListComponent }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
