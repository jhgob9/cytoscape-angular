import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-edge-arrows',
  templateUrl: './edge-arrows.component.html',
  styleUrls: ['./edge-arrows.component.css']
})
export class EdgeArrowsComponent implements OnInit {
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
      container: document.getElementById('cyEdgeArrows'),

      layout: {
        name: 'grid',
        columns: 4
      },

      style: fetch('./assets/edge-arrows/cy-style.json').then(toJson),

      elements: fetch('./assets/edge-arrows/data.json').then(toJson)
    });

    document.getElementById('hollow').addEventListener('click', () => {
      cy.edges().toggleClass('hollow');
    });

  }

}
