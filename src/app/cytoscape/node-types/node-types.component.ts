import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';

declare function removePopper(): any;

@Component({
  selector: 'app-node-types',
  templateUrl: './node-types.component.html',
  styleUrls: ['./node-types.component.css']
})
export class NodeTypesComponent implements OnInit {
  public cy: any;

  constructor(
    public SubTitle: SubtitleService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Node types';
    removePopper();
    let cy = this.cy;
    const toJson = res => res.json();
    cy = cytoscape({
      container: document.getElementById('cyNodeTypes'),

      layout: {
        name: 'grid',
        fit: true,
        padding: 50
      },

      style: fetch('./assets/node-types/cy-style.json').then(toJson),

      elements: fetch('./assets/node-types/data.json').then(toJson)
    });
  }

}
