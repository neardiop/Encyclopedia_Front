/**
 * Echart bar => Respect Delais
 * Il est appelé directement par la view respect delais grace au selector ngx-echarts-bar-respect-delais
 * Le tracé de la courbe se fait dans la fonction ngAfterView() aprés avoir fait tous les calculs nécessaire dans ngOnit
 */
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiService } from '../../@core/utils/services/api.services';
import { Router } from '@angular/router';

@Component({
  selector: 'cog-echarts-bar-respect-delais',
  template: `
    <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <nb-card>
          <nb-card-header>Respect des délais</nb-card-header>
          <nb-card-body>
          <div echarts [options]="options" class="echart"></div>
          </nb-card-body>
          <!-- <nb-card-footer>
            <a class="exportPNG" href="#" (click)="downloadImg($event)">Exporter au format PNG</a>
          </nb-card-footer> -->
        </nb-card>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class EchartsBarRespectDelaisComponent implements AfterViewInit, OnDestroy {

  tabs_retard_delais: any[] = [];
  tabs_retard_delais_enlevements: any[] = [];
  tabs_retard_delais_livraison: any[] = [];
  tabs_retard_delais_jours: any[] = [];
  options: any = {};
  themeSubscription: any;
  data: any;
  nbrLimit: number;
  idclient: number;
  parcourArray: any;
  select_tournee: any;
  limit: number;

  ngOnInit() {
    let cache: any;
    this.limit = JSON.parse(localStorage.getItem('limit'));
    if (localStorage.getItem('connect') != null) {
      this.idclient = JSON.parse(localStorage.getItem('connect')).client_id;
      cache = JSON.parse(localStorage.getItem('connect'));
      this.idclient = cache.client_id;
      if (localStorage.getItem('selected_tournee') != null) {
        this.select_tournee = JSON.parse(localStorage.getItem('selected_tournee'));
        this.getRespectsDelais('/reports/retards/tournee/' + this.select_tournee + '/client/' + this.idclient + '/' + this.limit);
      } else
        this.getRespectsDelais('/reports/retards/client/' + this.idclient + '/' + this.limit);
    } else
      this.router.navigate(['/auth']);
  }

  downloadImg(event) {
    const img = event.target;
    var canvas = document.getElementsByTagName('canvas')[1];
    img.href = canvas.toDataURL();
    img.download = 'graph_taux_scans_colis.png';
  }


  getRespectsDelais(url: string): void {
    this.apiService.getData(url).subscribe(
      (results: any) => {
        this.tabs_retard_delais = results.data;
        this.parcourArray = this.tabs_retard_delais[0].series;
        for (let i = 0; i < this.parcourArray.length; i++) {
          this.tabs_retard_delais_enlevements.push(this.tabs_retard_delais[0].series[i].value);
          this.tabs_retard_delais_livraison.push(this.tabs_retard_delais[1].series[i].value);
          this.tabs_retard_delais_jours.push(this.tabs_retard_delais[0].series[i].name);
        }
      }, () => {
        alert('error');
      }, () => {
        this.ngAfterViewInit();
      },
    );
  }

  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      this.options = {
        legend: {},
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100,
        }, {
          start: 0,
          end: 100,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,' +
            '9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,' +
            '24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        }],
        backgroundColor: echarts.bg,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          show: true,
          orientation:'horizontal',
          itemSize:20,
          feature: {
            mark: { show: true },
            dataView: { title:'Voir les données',show: true, readOnly: false,lang:[' ', 'Fermer', 'Tracer'],
            optionToContent: function(opt) {
              var axisData = opt.xAxis[0].data;
              var series = opt.series;
              var table = '<table class="table table-dark" style="width:100%;text-align:center"><tbody><tr>'
                           + '<td>Date:</td>'
                           + '<td>' + series[0].name + '</td>'
                           + '<td>' + series[1].name + '</td>'
                           + '</tr>';
              for (var i = 0, l = axisData.length; i < l; i++) {
                  table += '<tr>'
                           + '<td>' + axisData[i] + '</td>'
                           + '<td>' + series[0].data[i] + '</td>'
                           + '<td>' + series[1].data[i] + '</td>'
                           + '</tr>';
              }
              table += '</tbody></table>';
              return table;
          }
          },
            magicType: { show: true, type: ['line', 'bar'] ,title:{line:'Ligne',bar:'Barre'}},
            saveAsImage: { title: 'Image', show: true , name:'repect_delais',type:'png' }
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.tabs_retard_delais_jours,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Enlévements',
            data: this.tabs_retard_delais_enlevements,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 3,
            },
            color: '#ffb588 ',
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            }
          },
          {
            name: 'Livraisons',
            data: this.tabs_retard_delais_livraison,
            type: 'bar',
            barWidth: 10,
            smooth: true,
            showAllSymbol: true,
            color: '#7bd9e8',
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            },
            itemStyle: {
              barBorderRadius: 3,
            },
          }
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
