import { Component, OnInit, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { AppState, selectAuthState } from './../../store/app.states';
import { LogOut } from './../../store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cymain',
  templateUrl: './cymain.component.html',
  styleUrls: ['./cymain.component.css']
})

export class CymainComponent implements OnInit {
  getState: Observable<any>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  constructor(
    private store: Store<AppState>,
    public SubTitle: SubtitleService,
    private breakpointObserver: BreakpointObserver,
    public router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.SubTitle.subtitle = 'Cytoscape.js Demos';
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }
}
