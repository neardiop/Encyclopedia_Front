import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AfterViewInit } from '@angular/core'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { ApiService } from '../../@core/utils/services/api.services'
import { DataTableDirective } from 'angular-datatables'
import { DialogBoxComponent } from '../../@theme/components/dialog-box/dialog-box.component'

@Component({
  selector: 'ngx-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject()
  articles: any

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
  ) { }



  ngOnInit(): void {
    if (localStorage.getItem('connect') != null) {
      let cache = JSON.parse(localStorage.getItem('username'))
      const username = cache
      this.articles = []
      this.getArticle('/articles?user.id=' + 1)
    } else {
      this.router.navigate(['/auth'])
    }
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
          self.openDialog(this.articles[index])
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

  getArticle(url) {
    this.apiService.getData(url).subscribe(
      data => {
        this.articles = data["hydra:member"]
        console.log(this.articles)
      },
      error => {
      }, () => {
        this.dtTrigger.next()
      });
  }

  openDialog(row): void {
    this.dialog.open(DialogBoxComponent, {
      width: '800px',
      data: row,
    })
  }

  update(id) {
    alert(id)
    localStorage.setItem('update_hospital', 'true')
  }

  delete(id) {
    alert(id)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
}
