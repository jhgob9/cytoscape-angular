import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-linkout',
  templateUrl: './linkout.component.html',
  styleUrls: ['./linkout.component.css']
})
export class LinkoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Compound nodes';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyLinkout'),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          content: 'data(name)',
          'text-valign': 'center',
          color: 'white',
          'text-outline-width': 2,
          'text-outline-color': '#888',
          'background-color': '#888'
        })
        .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'
        }),

      elements: {
        nodes: [
          { data: { id: 'desktop', name: 'Cytoscape', href: 'http://cytoscape.org' } },
          { data: { id: 'js', name: 'Cytoscape.js', href: 'http://js.cytoscape.org' } }
        ],
        edges: [
          { data: { source: 'desktop', target: 'js' } }
        ]
      },

      layout: {
        name: 'grid',
        padding: 10
      }
    });

    cy.on('tap', 'node', function () {
      try { // your browser may block popups
        window.open(this.data('href'));
      } catch (e) { // fall back on url change
        window.location.href = this.data('href');
      }
    });
  }

}
