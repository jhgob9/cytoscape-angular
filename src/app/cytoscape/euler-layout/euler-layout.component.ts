import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-euler-layout',
  templateUrl: './euler-layout.component.html',
  styleUrls: ['./euler-layout.component.css']
})
export class EulerLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Euler layout';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyEulerLayout'),

      // demo your layout
      layout: {
        name: 'euler',
        randomize: true,
        animate: false

        // some more options here...
      },

      style: [
        {
          selector: 'node',
          style: {
            // content: 'data(name)',
            'background-color': '#126814'
          }
        },

        {
          selector: 'edge',
          style: {
            'line-color': '#126814',
            opacity: 0.5
          }
        },

        {
          selector: ':selected',
          style: {

          }
        }
      ],

      elements: fetch('./assets/euler-layout/data.json').then(res => res.json() )
    });
  }

}
