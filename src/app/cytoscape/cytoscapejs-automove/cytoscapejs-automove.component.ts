import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-cytoscapejs-automove',
  templateUrl: './cytoscapejs-automove.component.html',
  styleUrls: ['./cytoscapejs-automove.component.css']
})
export class CytoscapejsAutomoveComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Automove extension';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyAutomove'),

      layout: {
        name: 'preset'
      },

      style: [
        {
          selector: 'node',
          style: {
            label: 'data(id)'
          }
        },

        {
          selector: '.mid',
          style: {
            width: 8,
            height: 8,
            label: ''
          }
        }
      ],

      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'mid' }, classes: 'mid' },
        { data: { source: 'a', target: 'mid' } },
        { data: { source: 'b', target: 'mid' } },
        { data: { source: 'mid', target: 'c' } },

        { data: { id: 'd' } },

        { data: { id: 'e' } },
        { data: { id: 'f' } },
        { data: { source: 'e', target: 'f' } },

        { data: { id: 'g' } },

        { data: { id: 'h' } },
        { data: { id: 'i' } },
        { data: { source: 'h', target: 'i' } },

        { data: { id: 'j' } },
      ]
    });

    // cy.on('automove', function( evt ){
    // 	var target = evt.target || evt.cyTarget; // 3.x || 2.x
    //
    // 	console.log('automove event on %s', target.id());
    // });

    // a, b, c; with mid in the middle

    cy.$('#a, #b, #c').makeLayout({
      name: 'circle',
      boundingBox: {
        x1: 0,
        y1: 0,
        x2: 300,
        y2: 300
      }
    }).run();

    cy.automove({
      nodesMatching: cy.$('#mid'),
      reposition: 'mean',
      meanOnSelfPosition: (node: any) => false
    });

    // dragging mid drags its neighbourhood with it
    cy.automove({
      nodesMatching: cy.$('#mid').neighbourhood().nodes(),
      reposition: 'drag',
      dragWith: cy.$('#mid')
    });


    // d can't go out of a box

    cy.automove({
      nodesMatching: cy.$('#d'),
      reposition: { x1: 350, x2: 450, y1: 100, y2: 200 }
    });

    cy.$('#d').position({ x: 400, y: 150 });


    // e & f have the same y

    const eAndF = cy.$('#e, #f');

    eAndF.makeLayout({
      name: 'grid',
      boundingBox: { x1: 0, x2: 300, y1: 300, y2: 400 },
      cols: 2,
      fit: false
    }).run();

    cy.automove({
      nodesMatching: cy.$('#e, #f'),
      reposition: (node: any) => {
        const pos = node.position();

        if (node.grabbed()) { return pos; }

        const otherNode = eAndF.not(node);

        return {
          x: pos.x,
          y: otherNode.position('y')
        };
      },
      when: 'matching'
    });


    // g kept in viewport

    cy.$('#g').position({ x: 400, y: 350 });

    cy.fit(100); // make sure g is in the viewport for the demo

    cy.automove({
      nodesMatching: cy.$('#g'),
      reposition: 'viewport'
    });


    // i gets pulled along with h on drag

    cy.$('#h').position({ x: 585, y: 195 });
    cy.$('#i').position({ x: 510, y: 260 });

    cy.automove({
      nodesMatching: cy.$('#i'),
      reposition: 'drag',
      dragWith: cy.$('#h')
    });


    // j can't go in the box of d

    cy.$('#j').position({ x: 585, y: 350 });

    cy.automove({
      nodesMatching: cy.$('#j'),
      reposition: { type: 'outside', x1: 350, x2: 450, y1: 100, y2: 200 }
    });

    cy.fit(100); // make sure g is in the viewport for the demo

    // .automove-viewport nodes kept in viewport (even if added after this call)
    // convenient but less performant than `nodesMatching: collection`

    cy.automove({
      nodesMatching: '.automove-viewport',
      reposition: 'viewport'
    });

    cy.on('tap', (evt: any) => {
      const tgt = evt.target || evt.cyTarget; // 3.x || 2.x

      if (tgt === cy) {
        cy.add({
          classes: 'automove-viewport',
          data: { id: 'new' + Math.round(Math.random() * 100) },
          position: {
            x: evt.position.x,
            y: evt.position.y
          }
        });
      }
    });

    cy.on('cxttap', 'node', (evt: any) => {
      const tgt = evt.target || evt.cyTarget; // 3.x || 2.x
      tgt.remove();
    });

    cy.zoom(1);
    cy.center();
  }
}
