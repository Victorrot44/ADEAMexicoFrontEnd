import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  username: string | null = localStorage.getItem("nombre");

  constructor() { }

  ngOnInit(): void {  }

}
