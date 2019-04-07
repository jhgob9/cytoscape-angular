import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-cose-bilkent-layout',
  templateUrl: './cose-bilkent-layout.component.html',
  styleUrls: ['./cose-bilkent-layout.component.css']
})
export class CoseBilkentLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'CoSE Bilkent layout';
    removePopper();
    let cy = this.cy;
    const dataGet$ = ajax.getJSON('./assets/cose-bilkent-layout/data.json');
    dataGet$.subscribe(data => {
      cy = cytoscape({
        container: document.getElementById('cyCoseBlikent'),

        layout: {
          name: 'cose-bilkent',
          animate: false,
          randomize: true
        },

        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#ad1a66'
            }
          },

          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ad1a66'
            }
          }
        ],

        elements: data
      });
      document.getElementById('layoutButton').addEventListener('click', () => {
        const layout = cy.layout({
          name: 'cose-bilkent',
          animate: 'end',
          animationEasing: 'ease-out',
          animationDuration: 1000,
          randomize: true
        });

        layout.run();
      });
      document.getElementById('randomize').addEventListener('click', () => {
        const layout = cy.layout({
          name: 'random',
          animate: true,
          animationDuration: 1000,
          animationEasing: 'ease-out'
        });

        layout.run();
      });
    });
  }

}
