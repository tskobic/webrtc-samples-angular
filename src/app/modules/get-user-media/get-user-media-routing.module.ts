import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGetUserMediaComponent } from './components/basic-get-user-media/basic-get-user-media.component';
import { CanvasGetUserMediaComponent } from './components/canvas-get-user-media/canvas-get-user-media.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterGetUserMediaComponent } from './components/filter-get-user-media/filter-get-user-media.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'basic', component: BasicGetUserMediaComponent},
    { path: 'canvas', component: CanvasGetUserMediaComponent},
    { path: 'filter', component: FilterGetUserMediaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetUserMediaRoutingModule { }
