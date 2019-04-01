import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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
    const data$ = forkJoin(dataGet, styleGet);
    data$.subscribe((value: any) => {
      let h = function (tag, attrs, children) {
        const el = document.createElement(tag);

        Object.keys(attrs).forEach(function (key) {
          const val = attrs[key];

          el.setAttribute(key, val);
        });

        children.forEach(function (child) {
          el.appendChild(child);
        });

        return el;
      };

      const t = function (text) {
        const el = document.createTextNode(text);

        return el;
      };

      const $ = document.querySelector.bind(document);

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

      var $config = $('#config');
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
          label: h('span', { class: 'fa fa-random' }, []),
          layoutOpts: {
            randomize: true,
            flow: null
          }
        },

        {
          label: h('span', { class: 'fa fa-long-arrow-down' }, []),
          layoutOpts: {
            flow: { axis: 'y', minSeparation: 30 }
          }
        }
      ];

      sliders.forEach(makeSlider);

      buttons.forEach(makeButton);

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

      function makeSlider(opts) {
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
        
        const update = _.throttle(function () {
          params[opts.param] = $input.value;
          layout.stop();
          layout = makeLayout();
          layout.run();
        }, 1000 / 30);

        $input.addEventListener('input', update);
        $input.addEventListener('change', update);
      }

      function makeButton(opts) {
        const $button = h('button', { class: 'btn btn-default' }, [opts.label]);

        $btnParam.appendChild($button);

        $button.addEventListener('click', function () {
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

      const hideTippy = function (node) {
        const tippy = node.data('tippy');

        if (tippy != null) {
          tippy.hide();
        }
      };

      const hideAllTippies = function () {
        cy.nodes().forEach(hideTippy);
      };

      cy.on('tap', function (e) {
        if (e.target === cy) {
          hideAllTippies();
        }
      });

      cy.on('tap', 'edge', function (e) {
        hideAllTippies();
      });

      cy.on('zoom pan', function (e) {
        hideAllTippies();
      });
      cy.nodes().forEach(function (n: any) {
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
        ].map(function (link) {
          return h('a', { target: '_blank', href: link.url, class: 'tip-link' }, [t(link.name)]);
        });

        const tippy = makeTippy(n, h('div', {}, $links));

        n.data('tippy', tippy);

        n.on('click', function (e) {
          tippy.show();
          cy.nodes().not(n).forEach(hideTippy);
        });
      });
    });
  }
}
