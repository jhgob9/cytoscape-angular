import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';

// import * as cytoscape from 'cytoscape';
// import * as _ from 'lodash';
// import * as tippy from 'tippy.js';
// import * as cola from 'cytoscape-cola';
// import * as popper from 'cytoscape-popper';

import { SubtitleService } from 'src/app/services/subtitle.service';

@Component({
  selector: 'app-colajs-graph',
  templateUrl: './colajs-graph.component.html',
  styleUrls: ['./colajs-graph.component.css']
})
export class ColajsGraphComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Cola.js gene-gene graph';
    const dataGet = this.http.get('./assets/colajs-graph/data.json');
    const styleGet = this.http.get('./assets/colajs-graph/cy-style.json');
    const click$ = fromEvent(document, 'click').pipe(
      pluck('target')
    );
    const data$ = forkJoin(dataGet, styleGet);
    data$.subscribe((value: any) => {
      const h = (tag: any, attrs: any, children: any) => {
        const el = document.createElement(tag);

        Object.keys(attrs).forEach((key: any) => {
          const val = attrs[key];

          el.setAttribute(key, val);
        });

        children.forEach((child: any) => {
          el.appendChild(child);
        });

        return el;
      };

      const t = (text: any) => {
        const el = document.createTextNode(text);

        return el;
      };

      // const $ = document.querySelector.bind(document);

      let cy = this.cy;
      cy = cytoscape({
        container: document.getElementById('cy'),
        elements: value[0],
        style: value[1],
        layout: { name: 'random' }
      });

      const params: any = {
        name: 'cola',
        nodeSpacing: 5,
        edgeLengthVal: 45,
        animate: true,
        randomize: false,
        maxSimulationTime: 1500
      };
      let layout = makeLayout();

      layout.run();

      const $btnParam = h('div', {
        class: 'param'
      }, []);

      const $config = $('#config')[0];
      $config.appendChild($btnParam);

      const sliders = [
        {
          label: 'Edge length',
          param: 'edgeLengthVal',
          min: 1,
          max: 200
        },

        {
          label: 'Node spacing',
          param: 'nodeSpacing',
          min: 1,
          max: 50
        }
      ];

      const buttons = [
        {
          // label: h('mat-icon', { svgIcon: 'arrow_downward' }, []),
          label: h('span', {}, [t('Random')]),
          layoutOpts: {
            randomize: true,
            flow: null
          }
        }
      ];

      sliders.forEach(makeSlider);

      // buttons.forEach(makeButton);

      function makeLayout(opts?: any) {
        params.randomize = false;
        params.edgeLengthVal = (e) => {
          return params.edgeLengthVal / e.data('weight');
        };
        for (const i in opts) {
          params[i] = opts[i];
        }
        return cy.layout(params);
      }

      function makeSlider(opts?: any) {
        const $input = h('input', {
          id: 'slider-' + opts.param,
          type: 'range',
          min: opts.min,
          max: opts.max,
          step: 1,
          value: params[opts.param],
          class: 'slider'
        }, []);

        const $param = h('div', { class: 'param' }, []);

        const $label = h('label', { class: 'label label-default', for: 'slider-' + opts.param }, [t(opts.label)]);

        $param.appendChild($label);
        $param.appendChild($input);
        $config.appendChild($param);

        const update = _.throttle(() => {
          params[opts.param] = $input.value;
          layout.stop();
          layout = makeLayout();
          layout.run();
        }, 1000 / 30);

        $input.addEventListener('input', update);
        $input.addEventListener('change', update);
      }

      function makeButton(opts?: any) {
        const $button = h('button', { 'mat-icon-button': '' }, [opts.label]);
        $btnParam.appendChild($button);

        $button.addEventListener('click', () => {
          layout.stop();

          if (opts.fn) { opts.fn(); }
          layout = makeLayout(opts.layoutOpts);
          layout.run();
        });
      }

      function makeTippy(node: any, html: any) {
        const ti = tippy(node.popperRef(), {
          html,
          trigger: 'manual',
          arrow: true,
          placement: 'bottom',
          hideOnClick: false,
          interactive: true
        }).tooltips[0];
        return ti;
      }

      const hideTippy = (node: any) => {
        const tippy = node.data('tippy');

        if (tippy != null) {
          tippy.hide();
        }
      };

      const hideAllTippies = () => {
        cy.nodes().forEach(hideTippy);
      };

      cy.on('tap', (e: any) => {
        if (e.target === cy) {
          hideAllTippies();
        }
      });

      cy.on('tap', 'edge', (e: any) => {
        hideAllTippies();
      });

      cy.on('zoom pan', (e: any) => {
        hideAllTippies();
      });
      cy.nodes().forEach((n: any) => {
        const g = n.data('name');
        const $links = [
          {
            name: 'GeneCard',
            url: 'http://www.genecards.org/cgi-bin/carddisp.pl?gene=' + g
          },
          {
            name: 'UniProt search',
            url: 'http://www.uniprot.org/uniprot/?query=' + g + '&fil=organism%3A%22Homo+sapiens+%28Human%29+%5B9606%5D%22&sort=score'
          },
          {
            name: 'GeneMANIA',
            url: 'http://genemania.org/search/human/' + g
          }
        ].map((link: any) => {
          return h('a', { target: '_blank', href: link.url, class: 'tip-link' }, [t(link.name)]);
        });

        const tippy = makeTippy(n, h('div', {}, $links));

        n.data('tippy', tippy);

        n.on('click', (e: any) => {
          tippy.show();
          cy.nodes().not(n).forEach(hideTippy);
        });
      });
      click$.subscribe((tar) => {
        const $btn = $(tar).closest('button');
        if ($btn.hasClass('btn_cached')) { // 레이아웃 랜덤 버튼
          layout.stop();
          layout = makeLayout({
            randomize: true,
            flow: null
          });
          layout.run();
        }
        if ($btn.hasClass('btn_node_color_red')) { // nodes 컬러 레드 변경
          /* cy.nodes().css({ // 리셋이 되지 않음, 중간에 임의로 바꾸는 스타일이 아닌 초반에 스타일을 결정할 때 사용하는 것이 좋을 듯
            backgroundColor: 'red'
          }); */
          cy.style().selector('node')
            .style('background-color', 'red')
            .update();
        }
        if ($btn.hasClass('btn_edge_color_red')) { // edges 컬러 레드 변경
          cy.style().selector('edge')
            .style('line-color', 'red')
            .update();
        }
        /* if ($btn.hasClass('btn_edge_color_random')) { // edges 컬러 랜덤 변경
          cy.style().selector('edge')
            .style({
              'line-color': 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)+')'
            })
            .update();
          // Math.floor(Math.random() * 255)
        } */
        if ($btn.hasClass('btn_font_color_red')) { // font 컬러 레드 변경
          cy.style().selector('node')
            .style('color', 'red')
            .update();
        }
        if ($btn.hasClass('btn_reset')) { // 컬러 리셋
          cy.style(value[1]).update();
        }


      /* cy.elements().forEach((el: any) => {
        el.addClass('node_red');
        console.log(el);
      }); */
      /* cy.elements().forEach((el: any) => {
        console.log(el.id());
      }); */
          // console.log( cy.$('[group = "nodes"]') );
      /* cy.nodes().forEach((node: any) => {
        console.log(node.parent());
      }); */
      });
    });
  }
}
