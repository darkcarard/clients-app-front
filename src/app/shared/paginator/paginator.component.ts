import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: any;
  pages: number[];

  constructor() { }

  ngOnInit() {
    this.pages = new Array(this.paginator.totalPages).fill(0).map((value, index) => index + 1);
  }

}
