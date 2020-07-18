import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-my-article-view',
  templateUrl: './my-article-view.component.html',
  styleUrls: ['./my-article-view.component.scss']
})
export class MyArticleViewComponent implements OnInit {

  items = [
    {
      title: 'Acceuil',
      icon: 'home-outline',
      link: '/dashboard',
      home: true
    },
    {
      title: 'Créer un article',
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

  constructor() { }

  ngOnInit() {
  }

}
