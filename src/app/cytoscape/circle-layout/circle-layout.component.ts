import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-circle-layout',
  templateUrl: './circle-layout.component.html',
  styleUrls: ['./circle-layout.component.css']
})
export class CircleLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Circle layout';
    removePopper();
    let cy = this.cy;
    const dataGet$ = ajax.getJSON('./assets/circle-layout/data.json');
    dataGet$.subscribe(data => {
      cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        layout: {
          name: 'circle'
        },

        style: [
          {
            selector: 'node',
            style: {
              'height': 20,
              'width': 20,
              'background-color': '#e8e406'
            }
          },

          {
            selector: 'edge',
            style: {
              'curve-style': 'haystack',
              'haystack-radius': 0,
              width: 5,
              opacity: 0.5,
              'line-color': '#f2f08c'
            }
          }
        ],

        elements: data
      });
    });
  }
}
