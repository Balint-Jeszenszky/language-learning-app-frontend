import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  selectedTabIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showLogin() {
    this.selectedTabIndex = 0;
  }

}
