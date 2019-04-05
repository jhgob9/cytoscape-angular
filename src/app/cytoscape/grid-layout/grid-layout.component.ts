import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Grid layout';
    removePopper();
    let cy = this.cy;
    const dataGet$ = ajax.getJSON('./assets/grid-layout/data.json');
    dataGet$.subscribe(data => {
      cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        layout: {
          name: 'grid'
        },

        style: [
          {
            selector: 'node',
            style: {
              height: 20,
              width: 20,
              'background-color': '#18e018'
            }
          },

          {
            selector: 'edge',
            style: {
              'curve-style': 'haystack',
              'haystack-radius': 0,
              width: 5,
              opacity: 0.5,
              'line-color': '#a2efa2'
            }
          }
        ],

        elements: data
      });
    });
  }

}
