import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as cytoscape from 'cytoscape';

import { SubtitleService } from 'src/app/services/subtitle.service';

@Component({
  selector: 'app-tokyo-railways',
  templateUrl: './tokyo-railways.component.html',
  styleUrls: ['./tokyo-railways.component.css']
})
export class TokyoRailwaysComponent implements OnInit {
  public cy: any;
  public cySet = [];

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Tokyo railways';
    let cy = this.cy;
    var toJson = function (obj) { return obj.json(); };
    var toText = function (obj) { return obj.text(); };

    // get exported json from cytoscape desktop
    var graphP = fetch('./assets/tokyo-railways/tokyo-railways.json').then(toJson);

    // also get style
    var styleP = fetch('./assets/tokyo-railways/tokyo-railways.cycss').then(toText);
    
    Promise.all([graphP, styleP]).then(initCy);

    function initCy(then) {
      // var loading = document.getElementById('loading');
      var expJson = then[0];
      var styleJson = then[1];
      var elements = expJson.elements;

      // loading.classList.add('loaded');
      cy = cytoscape({
        container: document.getElementById('cy'),
        layout: { name: 'preset' },
        style: styleJson,
        elements: elements,
        motionBlur: true,
        selectionType: 'single',
        boxSelectionEnabled: false
      });

      /* mendData();
      bindRouters(); */
    }
   /*  this.http.get('./assets/tokyo-railways/tokyo-railways.json').subscribe(data => {
      this.cySet.push(data);
      this.http.get('./assets/tokyo-railways/tokyo-railways.cycss').subscribe(style => {
        this.cySet.push(style);
        CySet(this);
      });
    }); */
  }
}
function CySet(obj: any) {
  console.log(obj.cySet);
}
