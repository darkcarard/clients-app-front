import { Component } from '@angular/core';
import { AuthService } from 'src/app/feature/users/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private authService: AuthService, private router: Router){}

    logout(): void {
        this.authService.logout();
        Swal.fire('Logout', 'Succesfully logged out!', 'success');
        this.router.navigate(['/login']);
    }
}