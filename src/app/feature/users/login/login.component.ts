import {
  Component,
  OnInit
} from '@angular/core';
import { User } from 'src/app/shared/model/user';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Please, sing in!'
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal.fire('Already Authenticated','You\'re already authenticated','info');
      this.router.navigate(['/clients']);
    }
  }

  login(): void {
    if (this.user.username == null || this.user.password == null) {
      swal.fire('Login Error', 'Empty Username or Password', 'error');
    }

    this.authService.login(this.user).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      this.router.navigate(['/clients']);
      swal.fire('Welcome', `Hi ${user.username}, you are correctly logged!`, 'success');
    }, error => {
      if(error.status == 400) {
        swal.fire('Login Error', 'Bad user or password!', 'error');
      }
    });
  }
}
