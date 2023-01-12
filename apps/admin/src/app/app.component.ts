import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'angular-main-project-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService]
})
export class AppComponent {
    title = 'admin';
}
