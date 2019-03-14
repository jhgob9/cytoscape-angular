import { Component, OnInit } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-cytoscapebasic',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css']
})
export class CytoscapeBasicComponent implements OnInit {
  private cy: any;
  constructor() { }

  ngOnInit() {
    let _cy = this.cy;
    _cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' },
          position: { x: 0, y: 0 },
          renderedPosition: { x: 0, y: 0 }
        },
        { // node b
          data: { id: 'b' },
          position: { x: 0, y: 0 },
          renderedPosition: { x: 0, y: 0 }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': 'red',
            label: 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': 'blue',
            'target-arrow-color': 'blue',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      pan: { x: 0, y: 0 }

    });
    _cy.ready(() => console.log('_cy ready'));
    _cy.add({
      group: 'nodes',
      data: {
        weight: 75,
        id: 'c'
      },
      position: { x: 0, y: 0 }
    });
    let eles: any = _cy.add([
      { group: 'nodes', data: { id: 'n0' }, position: { x: 0, y: 50 } },
      { group: 'nodes', data: { id: 'n1' }, position: { x: 100, y: 50 } },
      { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
    ]);
    // _cy.remove(eles);
    let collection: any = _cy.collection();
    _cy.nodes().on('click', (e: Event) => {
      const clickedNode: any = e.target;
      collection = collection.union(clickedNode);
    });

    // console.log( _cy.$('edge') );
    // console.log( _cy.$id('ab') );
    // console.log( _cy.nodes() );
    // console.log( _cy.edges() );

    _cy.batch( () => {
      _cy.$('#a')
        .style('background-color', 'pink');
    });

    _cy.startBatch();
    _cy.$('#b')
      .style('background-color', 'green');
    _cy.endBatch();

    eles.on('click', (e: Event) => {
      console.log('click', e.target);
    });

    _cy.on('tap', 'node', (e: Event) => {
      console.log('tap', e.target);
    });

    _cy.pon('tap').then( (e: Event) => {
      console.log('tap promise fulfilled');
    });

    // eles.emit('click');

    _cy.center();

    console.log( _cy.container() );

    _cy.fit();
    // _cy.reset();

    // console.log( _cy.pan() );
    /* _cy.pan({
      x: 50,
      y: 50
    }); */

    /* _cy.panBy({
      x: 0,
      y: 0
    }); */

    // _cy.panningEnabled(false);
    // console.log(_cy.panningEnabled());

    // _cy.userPanningEnabled(false);
    // console.log(_cy.panningEnabled());

    // http://js.cytoscape.org/#cy.panningEnabled



  }

}
