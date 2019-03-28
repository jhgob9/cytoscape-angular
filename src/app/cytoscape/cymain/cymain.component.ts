import { Component, OnInit, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubtitleService } from 'src/app/services/subtitle.service';

@Component({
  selector: 'app-cymain',
  templateUrl: './cymain.component.html',
  styleUrls: ['./cymain.component.css']
})

export class CymainComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  constructor(
    public SubTitle: SubtitleService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.SubTitle.subtitle = 'Cytoscape.js Demos';
  }
}
