import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';


// import * as cytoscape from 'cytoscape';

import { SubtitleService } from 'src/app/services/subtitle.service';
import { TokyoRailwaysDialogComponent } from './tokyo-railways-dialog/tokyo-railways-dialog.component';
import { DialogData } from './DialogData';

@Component({
  selector: 'app-tokyo-railways',
  templateUrl: './tokyo-railways.component.html',
  styleUrls: ['./tokyo-railways.component.css']
})
export class TokyoRailwaysComponent implements OnInit {
  public cy: any;
  color: string;
  public cyFn: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Tokyo railways';
    const cyFn = () => {
      let cy = this.cy;


      // hyperscript-like function
      const h = (tag: any, attrs: any, children: any) => {
        const el = document.createElement(tag);

        if (attrs != null && typeof attrs === typeof {}) {
          Object.keys(attrs).forEach((key) => {
            const val = attrs[key];

            el.setAttribute(key, val);
          });
        } else if (typeof attrs === typeof []) {
          children = attrs;
        }

        if (children != null && typeof children === typeof []) {
          children.forEach((child) => {
            el.appendChild(child);
          });
        } else if (children != null && typeof children === typeof '') {
          el.appendChild(document.createTextNode(children));
        }

        return el;
      };
      const toJson = (obj) => obj.json();
      const toText = (obj) => obj.text();

      // get exported json from cytoscape desktop
      const graphP = fetch('./assets/tokyo-railways/tokyo-railways.json').then(toJson);

      // also get style
      const styleP = fetch('./assets/tokyo-railways/tokyo-railways.cycss').then(toText);

      Promise.all([graphP, styleP]).then(initCy);

      function initCy(then) {
        // var loading = document.getElementById('loading');
        const expJson = then[0];
        const styleJson = then[1];
        const elements = expJson.elements;

        // loading.classList.add('loaded');
        cy = cytoscape({
          container: document.getElementById('cy'),
          layout: { name: 'preset' },
          style: styleJson,
          elements,
          motionBlur: true,
          selectionType: 'single',
          boxSelectionEnabled: false
        });

        mendData();
        bindRouters();
      }
      function mendData() {
        // because the source data doesn't connect nodes properly, use the cytoscape api to mend it:

        cy.startBatch();

        // put nodes in bins based on name
        const nodes = cy.nodes();
        const bin = {};
        const metanames = [];
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const name = node.data('station_name');
          const nbin = bin[name] = bin[name] || [];

          nbin.push(node);

          if (nbin.length === 2) {
            metanames.push(name);
          }
        }

        // connect all nodes together with walking edges
        for (const i = 0; i < metanames.length; i++) {
          const name = metanames[i];
          const nbin = bin[name];

          for (const j = 0; j < nbin.length; j++) {
            for (let k = j + 1; k < nbin.length; k++) {
              const nj = nbin[j];
              const nk = nbin[k];

              cy.add({
                group: 'edges',
                data: {
                  source: nj.id(),
                  target: nk.id(),
                  is_walking: true
                }
              });
            }
          }

        }

        cy.endBatch();
      }

      let start: any;
      let end: any;
      const $body = document.body;

      function selectStart(node) {
        clear();

        $body.classList.add('has-start');

        start = node;

        start.addClass('start');
      }

      function selectEnd(node) {
        $body.classList.add('has-end', 'calc');

        end = node;

        cy.startBatch();

        end.addClass('end');

        setTimeout(() => {
          const aStar = cy.elements().aStar({
            root: start,
            goal: end,
            weight(e) {
              if (e.data('is_walking')) {
                return 0.25; // assume very little time to walk inside stn
              }

              return e.data('is_bullet') ? 1 : 3; // assume bullet is ~3x faster
            }
          });

          if (!aStar.found) {
            $body.classList.remove('calc');
            clear();

            cy.endBatch();
            return;
          }

          cy.elements().not(aStar.path).addClass('not-path');
          aStar.path.addClass('path');

          cy.endBatch();

          $body.classList.remove('calc');
        }, 300);
      }

      function clear() {
        $body.classList.remove('has-start', 'has-end');
        cy.elements().removeClass('path not-path start end');
      }

      let shownTippy;

      function makeTippy(node, html) {
        removeTippy();

        shownTippy = tippy(node.popperRef(), {
          html,
          trigger: 'manual',
          arrow: true,
          placement: 'bottom',
          hideOnClick: false,
          duration: [250, 0],
          theme: 'light',
          interactive: true,
          onHidden(tip) {
            if (tip != null) {
              tip.destroy();
            }
          }
        }).tooltips[0];

        shownTippy.show();

        return shownTippy;
      }

      function removeTippy() {
        if (shownTippy) {
          shownTippy.hide();
        }
      }

      function bindRouters() {

        const $clear = $('#clear');

        cy.on('tap pan zoom', (e: any) => {
          if (e.target === cy) {
            removeTippy();
          }
        });

        cy.on('tap', 'node', (e: any) => {
          const node = e.target;

          const start = h('button', { id: 'start' }, 'START');

          start.addEventListener('click', () => {
            const n = cy.$('node:selected');

            selectStart(n);

            removeTippy();
          });

          const end = h('button', { id: 'end', }, 'END');

          end.addEventListener('click', () => {
            const n = cy.$('node:selected');

            selectEnd(n);

            removeTippy();
          });

          const html = h('div', { className: 'select-buttons' }, [start, end]);

          makeTippy(node, html);
        });

        $clear.on('click', clear);
      }
    };
    cyFn();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TokyoRailwaysDialogComponent, {
      width: '250px',
      data: { color: this.color }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.color = result;
    });
  }
}
