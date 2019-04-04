import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

@Component({
  selector: 'app-popperjs-extension',
  templateUrl: './popperjs-extension.component.html',
  styleUrls: ['./popperjs-extension.component.css']
})
export class PopperjsExtensionComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Popper.js extension';
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            content: 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } }
        ],
        edges: [
          { data: { id: 'ab', source: 'a', target: 'b' } }
        ]
      },
      layout: {
        name: 'grid'
      },
      pan: { x: 0, y: 0 }
    });
    const a = cy.getElementById('a');
    const b = cy.getElementById('b');
    const ab = cy.getElementById('ab');

    const makeDiv = (text: string) => {
      const div = document.createElement('div');
      div.classList.add('popperjs-div');
      div.innerHTML = text;
      document.body.appendChild(div);
      return div;
    };

    const popperA = a.popper({
      content: () => makeDiv('Sticky position div')
    });

    const updateA = () => {
      popperA.scheduleUpdate();
    };

    a.on('position', updateA);
    cy.on('pan zoom resize', updateA);

    const popperB = b.popper({
      content: () => makeDiv('One time position div')
    });

    const popperAB = ab.popper({
      content: () => makeDiv('Sticky position div')
    });

    const updateAB = () => {
      popperAB.scheduleUpdate();
    };

    ab.connectedNodes().on('position', updateAB);
    cy.on('pan zoom resize', updateAB);

    cy.zoom(1);
    cy.center();
  }
}
