import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-popperjs-extension-tippyjs-tooltips',
  templateUrl: './popperjs-extension-tippyjs-tooltips.component.html',
  styleUrls: ['./popperjs-extension-tippyjs-tooltips.component.css']
})
export class PopperjsExtensionTippyjsTooltipsComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Popper.js extension & Tippy.js tooltips';
    removePopper();
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
      }
    });

    const a = cy.$('#a');
    const b = cy.$('#b');
    const ab = cy.$('#ab');

    const codeFn = (text: string) => {
      const div = document.createElement('div');
      div.innerHTML = text;
      return div;
    };
    const makeTippy = (node: any, text: string) => {
      return tippy(node.popperRef(), {
        html: codeFn(text),
        trigger: 'manual',
        arrow: true,
        placement: 'bottom',
        hideOnClick: false,
        multiple: true,
        sticky: true
      }).tooltips[0];
    };

    const tippyA = makeTippy(a, 'foo');
    tippyA.show();

    const tippyB = makeTippy(b, 'bar');

    tippyB.show();

    const tippyAB = makeTippy(ab, 'baz');

    tippyAB.show();

    cy.zoom(1);
    cy.center();
  }

}
