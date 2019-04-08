import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-edge-types',
  templateUrl: './edge-types.component.html',
  styleUrls: ['./edge-types.component.css']
})
export class EdgeTypesComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Edge types';
    removePopper();
    let cy = this.cy;
    const toJson = res => res.json();
    cy = cytoscape({
      container: document.getElementById('cyEdgeTypes'),

      layout: {
        name: 'grid',
        columns: 4,
        fit: true,
        padding: 60
      },

      style: fetch('./assets/edge-types/cy-style.json').then(toJson),

      elements: fetch('./assets/edge-types/data.json').then(toJson)
    });

    cy.ready(() => { // make taxi nodes better organised
      const n13 = cy.$('#n13');
      const n11 = cy.$('#n11');
      const n12 = cy.$('#n12');
      const p11 = n11.position();
      const p12 = n12.position();
      const d = (p12.x - p11.x) / 4;

      n13.position({
        x: (p11.x + p12.x) / 2,
        y: p11.y - d
      });

      n11.add(n12).position({ y: p11.y + d });
    });
  }

}
