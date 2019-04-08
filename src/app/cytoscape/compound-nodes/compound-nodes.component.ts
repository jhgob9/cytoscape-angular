import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-compound-nodes',
  templateUrl: './compound-nodes.component.html',
  styleUrls: ['./compound-nodes.component.css']
})
export class CompoundNodesComponent implements OnInit {
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
      container: document.getElementById('cyCompoundNodes'),

      boxSelectionEnabled: false,

      style: [
        {
          selector: 'node',
          css: {
            content: 'data(id)',
            'text-valign': 'center',
            'text-halign': 'center'
          }
        },
        {
          selector: ':parent',
          css: {
            'text-valign': 'top',
            'text-halign': 'center',
          }
        },
        {
          selector: 'edge',
          css: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      elements: {
        nodes: [
          { data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
          { data: { id: 'b' } },
          { data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
          { data: { id: 'd' }, position: { x: 215, y: 175 } },
          { data: { id: 'e' } },
          { data: { id: 'f', parent: 'e' }, position: { x: 300, y: 175 } }
        ],
        edges: [
          { data: { id: 'ad', source: 'a', target: 'd' } },
          { data: { id: 'eb', source: 'e', target: 'b' } }

        ]
      },

      layout: {
        name: 'preset',
        padding: 5
      }
    });
  }

}
