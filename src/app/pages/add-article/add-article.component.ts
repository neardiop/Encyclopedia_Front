import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  items = [
    {
      title: 'Acceuil',
      icon: 'home-outline',
      link: '/dashboard',
      home: true
    },
    {
      title: 'Créer un articles',
      icon: 'plus-square-outline',
      link: '/add_article',
      home: true
    },
    {
      title: 'Mes articles',
      icon: 'clipboard-outline',
      link: '/my_article',
      home: true
    },
  ]


  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('connect') != null) {
      
    } else {
      this.router.navigate(['/auth'])
    }
  }

}
