import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { StatusComponent } from './components/status/status.component';
import { CymainComponent } from './cytoscape/cymain/cymain.component';
import { ColajsGraphComponent } from './cytoscape/colajs-graph/colajs-graph.component';
import { TokyoRailwaysComponent } from './cytoscape/tokyo-railways/tokyo-railways.component';
import { PerformanceTuningComponent } from './cytoscape/performance-tuning/performance-tuning.component';
import { PopperjsExtensionComponent } from './cytoscape/popperjs-extension/popperjs-extension.component';
import { PopperjsExtensionTippyjsTooltipsComponent } from './cytoscape/popperjs-extension-tippyjs-tooltips/popperjs-extension-tippyjs-tooltips.component';
import { CytoscapejsAutomoveComponent } from './cytoscape/cytoscapejs-automove/cytoscapejs-automove.component';
import { CxtmenuExtensionComponent } from './cytoscape/cxtmenu-extension/cxtmenu-extension.component';
import { EdgehandlesExtensionComponent } from './cytoscape/edgehandles-extension/edgehandles-extension.component';
import { CircleLayoutComponent } from './cytoscape/circle-layout/circle-layout.component';
import { ConcentricLayoutComponent } from './cytoscape/concentric-layout/concentric-layout.component';
import { GridLayoutComponent } from './cytoscape/grid-layout/grid-layout.component';
import { CoseLayoutComponent } from './cytoscape/cose-layout/cose-layout.component';
import { CoseBilkentLayoutComponent } from './cytoscape/cose-bilkent-layout/cose-bilkent-layout.component';
import { CoseBilkentLayoutCompoundComponent } from './cytoscape/cose-bilkent-layout-compound/cose-bilkent-layout-compound.component';
import { ColaLayoutComponent } from './cytoscape/cola-layout/cola-layout.component';
import { ColaLayoutCompoundComponent } from './cytoscape/cola-layout-compound/cola-layout-compound.component';
import { EulerLayoutComponent } from './cytoscape/euler-layout/euler-layout.component';
import { SpreadLayoutComponent } from './cytoscape/spread-layout/spread-layout.component';
import { DagreLayoutComponent } from './cytoscape/dagre-layout/dagre-layout.component';
import { KlayLayoutComponent } from './cytoscape/klay-layout/klay-layout.component';
import { BreadthfirstLayoutComponent } from './cytoscape/breadthfirst-layout/breadthfirst-layout.component';
import { AnimatedBfsComponent } from './cytoscape/animated-bfs/animated-bfs.component';
import { NodeTypesComponent } from './cytoscape/node-types/node-types.component';
import { EdgeTypesComponent } from './cytoscape/edge-types/edge-types.component';
import { EdgeArrowsComponent } from './cytoscape/edge-arrows/edge-arrows.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'cy',
    component: CymainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ColajsGraphComponent },
      { path: 'colajs-graph', component: ColajsGraphComponent },
      { path: 'tokyo-railways', component: TokyoRailwaysComponent },
      { path: 'performance-tuning', component: PerformanceTuningComponent },
      { path: 'popperjs-extension', component: PopperjsExtensionComponent },
      { path: 'popperjs-extension-tippyjs-tooltips', component: PopperjsExtensionTippyjsTooltipsComponent },
      { path: 'automove-extension', component: CytoscapejsAutomoveComponent },
      { path: 'cxtmenu-extension', component: CxtmenuExtensionComponent },
      { path: 'edgehandles-extension', component: EdgehandlesExtensionComponent },
      { path: 'circle-layout', component: CircleLayoutComponent },
      { path: 'concentric-layout', component: ConcentricLayoutComponent },
      { path: 'grid-layout', component: GridLayoutComponent },
      { path: 'cose-layout', component: CoseLayoutComponent },
      { path: 'cose-bilkent-layout', component: CoseBilkentLayoutComponent },
      { path: 'cose-bilkent-layout-compound', component: CoseBilkentLayoutCompoundComponent },
      { path: 'cola-layout', component: ColaLayoutComponent },
      { path: 'cola-layout-compound', component: ColaLayoutCompoundComponent },
      { path: 'euler-layout', component: EulerLayoutComponent },
      { path: 'spread-layout', component: SpreadLayoutComponent },
      { path: 'dagre-layout', component: DagreLayoutComponent },
      { path: 'klay-layout', component: KlayLayoutComponent },
      { path: 'breadthfirst-layout', component: BreadthfirstLayoutComponent },
      { path: 'animated-bfs', component: AnimatedBfsComponent },
      { path: 'node-types', component: NodeTypesComponent },
      { path: 'edge-types', component: EdgeTypesComponent },
      { path: 'edge-arrows', component: EdgeArrowsComponent }
    ]
  },
  { path: '', component: LandingComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
