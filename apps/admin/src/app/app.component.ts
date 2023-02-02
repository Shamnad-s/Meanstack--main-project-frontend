import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Quill from 'quill';

@Component({
    selector: 'angular-main-project-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService, Quill]
})
export class AppComponent {
    title = 'admin';
}
