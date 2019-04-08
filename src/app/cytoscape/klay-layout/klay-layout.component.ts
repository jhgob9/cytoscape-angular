import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-klay-layout',
  templateUrl: './klay-layout.component.html',
  styleUrls: ['./klay-layout.component.css']
})
export class KlayLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Klay layout';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyKlayLayout'),

      // demo your layout
      layout: {
        name: 'klay',

        // some more options here...
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#dd4de2'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'line-color': '#dd4de2',
            'target-arrow-color': '#dd4de2',
            'opacity': 0.5
          }
        }
      ],

      elements: fetch('./assets/euler-layout/data.json').then(res => res.json())
    });

  }

}
