import { NbThemeService, NbSearchService } from '@nebular/theme';
import { link } from 'fs'
import { Router } from '@angular/router'
import { ApiService } from '../../@core/utils/services/api.services'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /**
   * items => Le menu de l'application
   */
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


  selected = 'default'
  url: string;
  articles: any;
  value = '';
  search = false
  no_search = false

  /**
   * 
   * @param apiService "permet de recuperer tous les fonction qu'on a défini au niveau de notre service"
   * @param router "pour naviguer entre nos pages"
   */
  constructor(private apiService: ApiService, private router: Router, private themeService: NbThemeService, private searchService: NbSearchService) {
    this.themeService.changeTheme('corporate');
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.getArticle("/articles?name=" + this.value);
      })
  }

  ngOnInit() {
    if (localStorage.getItem('connect') != null) {
      this.getArticle("/articles");
    } else {
      this.router.navigate(['/auth'])
    }
  }

  getArticle(url) {
    this.apiService.getData(url).subscribe(
      data => {
        this.articles = data["hydra:member"]
        console.log(this.articles)
      },
      error => {
      }, () => {
        //alert("Good")
      });
  }
}
