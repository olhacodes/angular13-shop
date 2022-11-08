import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links = ['', 'products', 'basket'];
  activeLink: string;

  setActiveLink(page: string) {
    this.activeLink = page;
  }

  constructor() { }

  ngOnInit() {
  }

}
