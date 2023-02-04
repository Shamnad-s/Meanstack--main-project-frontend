import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
const routes: Routes = [{ path: '', component: HomePageComponent }];
@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, EventsListComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
