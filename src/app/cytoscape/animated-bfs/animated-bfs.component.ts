import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-animated-bfs',
  templateUrl: './animated-bfs.component.html',
  styleUrls: ['./animated-bfs.component.css']
})
export class AnimatedBfsComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Animated BFS';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyAnimatedBfs'),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
        .selector('node')
        .style({
          content: 'data(id)'
        })
        .selector('edge')
        .style({
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          width: 4,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd'
        })
        .selector('.highlighted')
        .style({
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }),

      elements: {
        nodes: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'd' } },
          { data: { id: 'e' } }
        ],

        edges: [
          { data: { id: 'a"e', weight: 1, source: 'a', target: 'e' } },
          { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
          { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
          { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
          { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
          { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
          { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
        ]
      },

      layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
      }
    });

    const bfs = cy.elements().bfs('#a', () => {}, true);

    let i = 0;
    const highlightNextEle = () => {
      if (i < bfs.path.length) {
        bfs.path[i].addClass('highlighted');

        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };

    // kick off first highlight
    highlightNextEle();
  }

}
