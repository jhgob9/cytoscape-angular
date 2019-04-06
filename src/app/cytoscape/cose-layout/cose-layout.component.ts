import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { forkJoin } from 'rxjs';

declare function removePopper(): any;

@Component({
  selector: 'app-cose-layout',
  templateUrl: './cose-layout.component.html',
  styleUrls: ['./cose-layout.component.css']
})
export class CoseLayoutComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Cose layout';
    removePopper();
    const dataGet = this.http.get('./assets/colajs-graph/data.json');
    const styleGet = this.http.get('./assets/colajs-graph/cy-style.json');
    const data$ = forkJoin(dataGet, styleGet);
    data$.subscribe(value => {
      let cy = this.cy;
      cy = cytoscape({
        container: document.getElementById('cyCose'),

        layout: {
          name: 'cose',
          idealEdgeLength: 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: 400000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        },

        style: value[1],

        elements: value[0]

      });
    });
  }

}
