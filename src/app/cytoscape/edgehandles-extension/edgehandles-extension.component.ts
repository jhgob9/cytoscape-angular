import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-edgehandles-extension',
  templateUrl: './edgehandles-extension.component.html',
  styleUrls: ['./edgehandles-extension.component.css']
})
export class EdgehandlesExtensionComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Edgehandles extension';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyEdgehandles'),

      layout: {
        name: 'grid',
        rows: 2,
        cols: 2
      },

      style: [
        {
          selector: 'node[name]',
          style: {
            content: 'data(name)'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        },

        // some style for the extension

        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            width: 12,
            height: 12,
            shape: 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0
          }
        },

        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red'
          }
        },

        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },

        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },

        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
          }
        },

        {
          selector: '.eh-ghost-edge.eh-preview-active',
          style: {
            opacity: 0
          }
        }
      ],

      elements: {
        nodes: [
          { data: { id: 'j', name: 'Jerry' } },
          { data: { id: 'e', name: 'Elaine' } },
          { data: { id: 'k', name: 'Kramer' } },
          { data: { id: 'g', name: 'George' } }
        ],
        edges: [
          { data: { source: 'j', target: 'e' } },
          { data: { source: 'j', target: 'k' } },
          { data: { source: 'j', target: 'g' } },
          { data: { source: 'e', target: 'j' } },
          { data: { source: 'e', target: 'k' } },
          { data: { source: 'k', target: 'j' } },
          { data: { source: 'k', target: 'e' } },
          { data: { source: 'k', target: 'g' } },
          { data: { source: 'g', target: 'j' } }
        ]
      }
    });

    const eh = cy.edgehandles();

    document.querySelector('#draw-on').addEventListener('click', () => {
      eh.enableDrawMode();
    });

    document.querySelector('#draw-off').addEventListener('click', () => {
      eh.disableDrawMode();
    });

    document.querySelector('#start').addEventListener('click', () => {
      eh.start(cy.$('node:selected'));
    });

    cy.zoom(1.1);
    // cy.center();
    cy.pan({ x: -150, y: -100 });
  }

}
