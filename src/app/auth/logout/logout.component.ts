import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router : Router
  ) {
   }

  ngOnInit() {
    localStorage.removeItem('connect');
    localStorage.removeItem('selected_tournee');
    localStorage.removeItem('limit');
    localStorage.removeItem('tournees_exit');
    this.router.navigate(['./auth']);
  }

}
