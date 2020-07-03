import { NbThemeService } from '@nebular/theme';
import { link } from 'fs'
/**
 * Dashboard Components -> Ce component permet de regrouper tous les component qu'on utilise dans notre application
 * Fonctions :
 *  -> getTournees(): permet de recuperer tous les tournees en ce connectant à l'API
 *  -> selectTournee(): elle nous permet de détecter la sélection d'une tournée et de reload les components en affichant que les données de cete tournée
 *  -> displayAllTournees() : cette fonction nous donne la possibilité de reload tous les component pour recuperer tous les donnees de tous les tournees
 */
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
      title: 'Menu',
      icon: 'pie-chart-outline',
      link: '/dashboard',
      home: true
    },
  ]

  idclient: any
  nomClient: string
  tournees: any
  select_tournee: boolean
  tourneeNum: any
  showMissionsGraph: boolean = true
  showTauxScansPointsGraph: boolean = true
  showTauxScansColisGraph: boolean = true
  showRespectDelaisGraph: boolean = true
  showDataTable: boolean = true
  limit: number
  selected = 'default'

  /**
   * 
   * @param apiService "permet de recuperer tous les fonction qu'on a défini au niveau de notre service"
   * @param router "pour naviguer entre nos pages"
   */
  constructor(private apiService: ApiService, private router: Router,private themeService:NbThemeService) {
    this.themeService.changeTheme('corporate');
  }

  ngOnInit() {
    this.limit = JSON.parse(localStorage.getItem('limit'))
    let cache: any
    if (localStorage.getItem('connect') != null) {
      this.idclient = JSON.parse(localStorage.getItem('connect')).client_id
      cache = JSON.parse(localStorage.getItem('connect'))
      this.idclient = cache.client_id
      this.nomClient = cache.nom_client
      /*this.getTournees(
        '/reports/tournees/client/' + this.idclient + '/' + this.limit,
      )*/
    } else {
      this.router.navigate(['/auth'])
    }
  }

  /**
   * Cette fonction permet de recuperer tous les tournees
   * @param url "pour recuperer tous les tournées"
   */
  getTournees(url: string): void {
    this.apiService.getData(url).subscribe((results: any) => {
      this.tournees = results.tournees
    })
  }

  /**
   *
   * @param event "permet de détecter la sélection de toutes les tournées"
   */
  displayAllTournee(event: any) {
    if (event.isUserInput) {
      localStorage.removeItem('selected_tournee')
      this.showMissionsGraph = false
      setTimeout(() => (this.showMissionsGraph = true))
      this.showTauxScansPointsGraph = false
      setTimeout(() => (this.showTauxScansPointsGraph = true))
      this.showTauxScansColisGraph = false
      setTimeout(() => (this.showTauxScansColisGraph = true))
      this.showRespectDelaisGraph = false
      setTimeout(() => (this.showRespectDelaisGraph = true))
      this.showDataTable = false
      setTimeout(() => (this.showDataTable = true))
    }
  }

  /**
   *
   * @param event "permet de détecter une tournée sélectionner et d'afficher les donées approprié"
   */
  selectTournee(event: any) {
    if (event.isUserInput) {
      if (event.source.value == null || event.source.value == '') {
      } else {
        this.tourneeNum = event.source.value
        localStorage.setItem('selected_tournee',
          JSON.stringify(this.tourneeNum),
        )
        this.showMissionsGraph = false
        setTimeout(() => (this.showMissionsGraph = true))
        this.showTauxScansPointsGraph = false
        setTimeout(() => (this.showTauxScansPointsGraph = true))
        this.showTauxScansColisGraph = false
        setTimeout(() => (this.showTauxScansColisGraph = true))
        this.showRespectDelaisGraph = false
        setTimeout(() => (this.showRespectDelaisGraph = true))
        this.showDataTable = false
        setTimeout(() => (this.showDataTable = true))
      }
    }
  }
}
