import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { CytoscapeBasicComponent } from './cytoscape/basic/cytoscape.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import { SubtitleService } from 'src/app/services/subtitle.service';
import {TokenInterceptor, ErrorInterceptor} from './services/token.interceptor';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StatusComponent } from './components/status/status.component';
import { CymainComponent } from './cytoscape/cymain/cymain.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { ColajsGraphComponent } from './cytoscape/colajs-graph/colajs-graph.component';
import { TokyoRailwaysComponent } from './cytoscape/tokyo-railways/tokyo-railways.component';
import { TokyoRailwaysDialogComponent } from './cytoscape/tokyo-railways/tokyo-railways-dialog/tokyo-railways-dialog.component';
import { PerformanceTuningComponent } from './cytoscape/performance-tuning/performance-tuning.component';
import { PopperjsExtensionComponent } from './cytoscape/popperjs-extension/popperjs-extension.component';
import { PopperjsExtensionTippyjsTooltipsComponent } from './cytoscape/popperjs-extension-tippyjs-tooltips/popperjs-extension-tippyjs-tooltips.component';
import { CytoscapejsAutomoveComponent } from './cytoscape/cytoscapejs-automove/cytoscapejs-automove.component';
import { CxtmenuExtensionComponent } from './cytoscape/cxtmenu-extension/cxtmenu-extension.component';
import { EdgehandlesExtensionComponent } from './cytoscape/edgehandles-extension/edgehandles-extension.component';
import { CircleLayoutComponent } from './cytoscape/circle-layout/circle-layout.component';
import { ConcentricLayoutComponent } from './cytoscape/concentric-layout/concentric-layout.component';
import { GridLayoutComponent } from './cytoscape/grid-layout/grid-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    CytoscapeBasicComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    StatusComponent,
    CymainComponent,
    ColajsGraphComponent,
    TokyoRailwaysComponent,
    TokyoRailwaysDialogComponent,
    PerformanceTuningComponent,
    PopperjsExtensionComponent,
    PopperjsExtensionTippyjsTooltipsComponent,
    CytoscapejsAutomoveComponent,
    CxtmenuExtensionComponent,
    EdgehandlesExtensionComponent,
    CircleLayoutComponent,
    ConcentricLayoutComponent,
    GridLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    SubtitleService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TokyoRailwaysDialogComponent]
})
export class AppModule { }
