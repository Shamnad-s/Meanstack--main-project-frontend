import { Component } from '@angular/core';
import { AuthService } from '@angular-main-project/users';
@Component({
    selector: 'angular-main-project-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(private authService: AuthService) {}

    logoutUser() {
        this.authService.logout();
    }
}
