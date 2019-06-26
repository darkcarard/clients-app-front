import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Bienvenido a Angular';
  curse: string = 'Curso Spring 5 con Angular 7';
  teacher: string = 'Carlos Ardila'
}
