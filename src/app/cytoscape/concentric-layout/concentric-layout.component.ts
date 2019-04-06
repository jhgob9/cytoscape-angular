import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-concentric-layout',
  templateUrl: './concentric-layout.component.html',
  styleUrls: ['./concentric-layout.component.css']
})
export class ConcentricLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Concentric layout';
    removePopper();
    let cy = this.cy;
    const dataGet$ = ajax.getJSON('./assets/concentric-layout/data.json');
    dataGet$.subscribe(data => {
      cy = cytoscape({
        container: document.getElementById('cyConcentric'),

        boxSelectionEnabled: false,
        autounselectify: true,

        layout: {
          name: 'concentric',
          concentric: (node: any) => {
            return node.degree();
          },
          levelWidth: (nodes: any) => {
            return 2;
          }
        },

        style: [
          {
            selector: 'node',
            style: {
              height: 20,
              width: 20,
              'background-color': '#30c9bc'
            }
          },

          {
            selector: 'edge',
            style: {
              'curve-style': 'haystack',
              'haystack-radius': 0,
              width: 5,
              opacity: 0.5,
              'line-color': '#a8eae5'
            }
          }
        ],

        elements: data
      });
    });
  }

}
