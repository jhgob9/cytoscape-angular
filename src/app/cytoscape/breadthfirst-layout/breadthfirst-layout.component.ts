import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-breadthfirst-layout',
  templateUrl: './breadthfirst-layout.component.html',
  styleUrls: ['./breadthfirst-layout.component.css']
})
export class BreadthfirstLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Breadthfirst layout & images';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyBreadthfirstLayout'),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          height: 80,
          width: 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5
        })
        .selector('.eating')
        .css({
          'border-color': 'red'
        })
        .selector('.eater')
        .css({
          'border-width': 9
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          width: 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa'
        })
        .selector('#bird')
        .css({
          'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
        })
        .selector('#cat')
        .css({
          'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
        })
        .selector('#ladybug')
        .css({
          'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
        })
        .selector('#aphid')
        .css({
          'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
        })
        .selector('#rose')
        .css({
          'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
        })
        .selector('#grasshopper')
        .css({
          'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
        })
        .selector('#plant')
        .css({
          'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
        })
        .selector('#wheat')
        .css({
          'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
        }),

      elements: {
        nodes: [
          { data: { id: 'cat' } },
          { data: { id: 'bird' } },
          { data: { id: 'ladybug' } },
          { data: { id: 'aphid' } },
          { data: { id: 'rose' } },
          { data: { id: 'grasshopper' } },
          { data: { id: 'plant' } },
          { data: { id: 'wheat' } }
        ],
        edges: [
          { data: { source: 'cat', target: 'bird' } },
          { data: { source: 'bird', target: 'ladybug' } },
          { data: { source: 'bird', target: 'grasshopper' } },
          { data: { source: 'grasshopper', target: 'plant' } },
          { data: { source: 'grasshopper', target: 'wheat' } },
          { data: { source: 'ladybug', target: 'aphid' } },
          { data: { source: 'aphid', target: 'rose' } }
        ]
      },

      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      }
    }); // cy init

    cy.on('tap', 'node', () => {
      let nodes = this;
      const tapped = nodes;
      const food = [];

      nodes.addClass('eater');

      for (; ;) {
        const connectedEdges = nodes.connectedEdges((el) => {
          return !el.target().anySame(nodes);
        });

        const connectedNodes = connectedEdges.targets();

        Array.prototype.push.apply(food, connectedNodes);

        nodes = connectedNodes;

        if (nodes.empty()) { break; }
      }

      let delay = 0;
      const duration = 500;
      for (let i = food.length - 1; i >= 0; i--) {
        (() => {
          const thisFood = food[i];
          const eater = thisFood.connectedEdges((el) => {
            return el.target().same(thisFood);
          }).source();

          thisFood.delay(delay, () => {
            eater.addClass('eating');
          }).animate({
            position: eater.position(),
            css: {
              width: 10,
              height: 10,
              'border-width': 0,
              opacity: 0
            }
          }, {
              duration,
              complete() {
                thisFood.remove();
              }
            });

          delay += duration;
        })();
      } // for

    }); // on tap
  }

}
