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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'cy',
    component: CymainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ColajsGraphComponent
      },
      {
        path: 'colajs-graph',
        component: ColajsGraphComponent
      },
      {
        path: 'tokyo-railways',
        component: TokyoRailwaysComponent
      },
      {
        path: 'performance-tuning',
        component: PerformanceTuningComponent
      },
      {
        path: 'popperjs-extension',
        component: PopperjsExtensionComponent
      },
      {
        path: 'popperjs-extension-tippyjs-tooltips',
        component: PopperjsExtensionTippyjsTooltipsComponent
      },
      {
        path: 'automove-extension',
        component: CytoscapejsAutomoveComponent
      }
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
