import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/feature/users/auth.service';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService, private router : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError (e => {          
          let uri: string = '';
      
          if (e.status == 401) {
            if(this.authService.isAuthenticated()) {
              this.authService.logout();
            }        
            uri = '/login';   
          }
          
          if (e.status == 403) {      
            swal.fire('Access Denied', 'You are not authorized to perform this action!', 'warning');
            uri = '/clients'; 
          }
      
          this.router.navigate([uri]);
          
          return throwError(e);                  
      })
    )
  }
}