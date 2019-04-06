import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-cxtmenu-extension',
  templateUrl: './cxtmenu-extension.component.html',
  styleUrls: ['./cxtmenu-extension.component.css']
})
export class CxtmenuExtensionComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Cxtmenu extension';
    removePopper();
    let cy = this.cy;
    cy = cytoscape({
      container: document.getElementById('cyCxtmenu'),

      style: [
        {
          selector: 'node',
          css: {
            content: 'data(name)'
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

    cy.cxtmenu({
      selector: 'node, edge',

      commands: [
        {
          content: '<span class="fa fa-flash fa-2x"></span>',
          select: (ele: any) => {
            console.log(ele.id());
          }
        },

        {
          content: '<span class="fa fa-star fa-2x"></span>',
          select: (ele: any) => {
            console.log(ele.data('name'));
          },
          enabled: false
        },

        {
          content: 'Text',
          select: (ele: any) => {
            console.log(ele.position());
          }
        }
      ]
    });

    cy.cxtmenu({
      selector: 'core',

      commands: [
        {
          content: 'bg1',
          select: () => {
            console.log('bg1');
          }
        },

        {
          content: 'bg2',
          select: () => {
            console.log('bg2');
          }
        }
      ]
    });

    cy.zoom(1);
    cy.center();
  }

}
