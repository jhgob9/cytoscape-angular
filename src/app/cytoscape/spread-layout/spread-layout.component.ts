import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-spread-layout',
  templateUrl: './spread-layout.component.html',
  styleUrls: ['./spread-layout.component.css']
})
export class SpreadLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Spread layout';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cySpreadLayout'),

      layout: {
        name: 'spread',
        minDist: 40
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#ea8a31'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'haystack',
            'haystack-radius': 0,
            width: 3,
            opacity: 0.666,
            'line-color': '#fcc694'
          }
        }
      ],
      elements: fetch('./assets/euler-layout/data.json').then(res => res.json())
    });
  }

}
