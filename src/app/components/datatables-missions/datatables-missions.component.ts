/**
 * DataTables Missions Components => Pour le tableau représentant les missions et leur détails
 * Technologie: DataTables
 * Fonctions:
 *  -> openDialog():Pour ouvrir la fenétre de dialog pour les détails d'une ligne sélectionné
 *  -> getDetails():Permet de recupérer les détails d'une ligne sélectionner
 *  -> getMissionsDetails() : prototype pour recupérer les détails des missions avec la fonction subscribe,il est appelé par la fonction getDetails()
 *  -> ngOnInit(): appelé au moment d'initialiser le component
 *  -> ngAfterViewInit(): cette fonction est appelé juste aprés l'initialisation du component directement par angular grace à l'implementation de la class AfterViewInit
 *     elle permet d'afficher le tableau aprés que la fonction ngOnIit() termine la recupération des données
 *  -> changeTable(): elle permet de détecter la sélection d'une date pour reload le dataTables et afficher les nouvelles données
 *  -> getMissionsDestinataire(): elle permet de recuper les données du tableau
 *  -> getTournees(): elle permet de recuper tous les tournées
 *  -> ngOnDestroy(): elle permet de libérer les ressources subcriber utilisé
 */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AfterViewInit } from '@angular/core'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { DialogBoxComponent } from '../../@theme/components/dialog-box/dialog-box.component'
import { ApiService } from '../../@core/utils/services/api.services'
import { DataTableDirective } from 'angular-datatables'

@Component({
  selector: 'cog-datatables-missions',
  templateUrl: './datatables-missions.component.html',
  styleUrls: ['./datatables-missions.component.scss'],
})
export class DatatablesMissionsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject()
  get_missions: any
  get_date: any
  date: any[] = []
  idclient: any
  selectedDate = ''
  dataSource: any
  load: boolean = false
  array_dst: any[] = []
  selected = 'default'
  message = ''
  details: any
  limit: number
  tournees: any
  select_tournee: boolean = false
  tourneeNum: any
  dialogDst: string
  dialogDate: string
  myEventSubscription: any
  myEventSubscription1: any
  myEventSubscription2: any

  /**
   *
   * @param apiService "permet d'appeler tous les fonctions défini au niveau de notre service"
   * @param router "permet de naviguer entre les pages"
   * @param dialog "pour accéder au component boite de dialgue"
   */
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  /**
   *
   * @param data "les détails recupérer via l'API"
   */
  openDialog(data: any): void {
    this.details = data
    this.dialog.open(DialogBoxComponent, {
      width: '800px',
      data: this.details,
    })
  }

  /**
   *
   * @param info "les informations de la ligne sélectionnée"
   */
  getDetails(info: any) {
    if (this.selectedDate == '') {
      this.selectedDate = this.date[0]
    }
    let date_str = this.selectedDate
    let arr_dates = date_str.split('/')
    date_str = arr_dates[2] + '-' + arr_dates[1] + '-' + arr_dates[0]
    info.date = date_str
    this.dialogDst = info[0]
    this.dialogDate = info.date
    if (localStorage.getItem('selected_tournee') != null) {
      this.select_tournee = JSON.parse(localStorage.getItem('selected_tournee'))
      this.getMissionDetails(
        '/reports/retard/client/tournee/' +
          this.idclient +
          '/' +
          info.date +
          '/' +
          info[0] +
          '/' +
          this.select_tournee,
      )
    } else
      this.getMissionDetails(
        '/reports/retard/client/' +
          this.idclient +
          '/' +
          info.date +
          '/' +
          info[0],
      )
  }

  /**
   *
   * @param url "Url de l'API permettant de recuperer les détails des missions"
   */
  getMissionDetails(url: string): void {
    this.myEventSubscription = this.apiService.getData(url).subscribe(
      (results: any) => {
        let details = results
        this.details = details
        details.title =
          'Retards detaillés de ' + this.dialogDst + ' le ' + this.dialogDate
      },
      () => {
        alert('Error for get details')
      },
      () => {
        // On ouvre la fenétre de dialogue sauf si il y'a des donnée à afficher,sinon on fait rien lors du click
        if (this.details[0]) {
          this.openDialog(this.details)
        } else {
          alert("Il n'y a pas de retards détaillés pour ce destinataire")
        }
      },
    )
  }

  ngOnInit(): void {
    this.limit = JSON.parse(localStorage.getItem('limit'))
    let cache: any
    if (localStorage.getItem('connect') != null) {
      this.idclient = JSON.parse(localStorage.getItem('connect')).client_id
      cache = JSON.parse(localStorage.getItem('connect'))
      this.idclient = cache.client_id
      this.getTournees(
        '/reports/tournees/client/' + this.idclient + '/' + this.limit,
      )
      if (localStorage.getItem('selected_tournee') != null) {
        this.select_tournee = JSON.parse(
          localStorage.getItem('selected_tournee'),
        )
        this.getMissionsDestinataires(
          '/reports/missions/destinataires/tournee/' +
            this.select_tournee +
            '/client/' +
            this.idclient +
            '/' +
            this.limit,
        )
      } else
        this.getMissionsDestinataires(
          '/reports/missions/destinataires/client/' +
            this.idclient +
            '/' +
            this.limit,
        )
    } else this.router.navigate(['/auth'])
  }

  reloadTableWithDateSelected(): void {
    if (localStorage.getItem('selected_tournee') != null) {
      this.select_tournee = JSON.parse(localStorage.getItem('selected_tournee'))
      this.getMissionsDestinataires(
        '/reports/missions/destinataires/tournee/' +
          this.select_tournee +
          '/client/' +
          this.idclient +
          '/' +
          this.limit,
      )
    } else
      this.getMissionsDestinataires(
        '/reports/missions/destinataires/client/' +
          this.idclient +
          '/' +
          this.limit,
      )
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
      select: true,
      deferRender: true,
      lengthChange: true,
      autoWidth: true,
      info: true,
      language: {
        info: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        infoEmpty: "Affichage de l'élément 0 à 0 sur 0 élément",
        infoFiltered: '(filtré à partir de _MAX_ éléments au total)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Afficher _MENU_ éléments',
        loadingRecords: 'Chargement...',
        processing: 'Traitement...',
        search: 'Rechercher :',
        zeroRecords: 'Aucun élément correspondant trouvé',
        paginate: {
          first: 'Premier',
          last: 'Dernier',
          next: 'Suivant',
          previous: 'Précédent',
        },
        aria: {
          sortAscending: ': activer pour trier la colonne par ordre croissant',
          sortDescending:
            ': activer pour trier la colonne par ordre décroissant',
        },
      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this
        $('td', row).unbind('click')
        $('td', row).bind('click', () => {
          if (data[0] == '' || data[0] == null) {
          } else {
            self.getDetails(data)
          }
        })
        return row
      },
      dom: 'Bfrtip',
      buttons: [
        { extend: 'excel', text: 'Exporter' },
        { extend: 'colvis', text: 'Visibilité' },
        { extend: 'print', text: 'Imprimer' },
      ],
    }
  }

  /**
   *  Destroy Table and reinstanciate the datatable
   * @param event "détecter le clic de l'utilisateur sur l'item select d'une date"
   */
  changeTable(event: any) {
    if (event.isUserInput) {
      this.selectedDate = event.source.value
      this.load = true
      this.reloadTableWithDateSelected()
    }
  }

  /**
   *
   * @param url "url de l'API permettant de recupérer les données du tableau"
   */
  getMissionsDestinataires(url: string): void {
    this.myEventSubscription1 = this.apiService.getData(url).subscribe(
      (results: any) => {
        if (this.selectedDate === '') {
          this.get_missions = results[0].details
          this.get_date = results
          for (let i = 0; i < this.get_date.length; i++) {
            this.date.push(this.get_date[i].date)
          }
        } else {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy()
            this.get_date = results
            for (let i = 0; i < this.get_date.length; i++) {
              if (this.get_date[i].date === this.selectedDate) {
                this.array_dst = this.get_date[i].details
              }
            }
            this.get_missions = this.array_dst
            this.dtTrigger.next()
            for (let i = 0; i < this.get_date.length; i++) {
              this.date.push(this.get_date[i].date)
            }
          })
        }
      },
      () => {
        alert('Error for load all data')
      },
      () => {
        if (this.selectedDate === '') {
          this.dtTrigger.next()
        }
      },
    )
  }

  /**
   *
   * @param url "url de l'API permettant de recupérer les tournées"
   */
  getTournees(url: string): void {
    this.myEventSubscription2 = this.apiService
      .getData(url)
      .subscribe((results: any) => {
        this.tournees = results.tournees
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.myEventSubscription1.unsubscribe()
    this.myEventSubscription2.unsubscribe()
  }
}
