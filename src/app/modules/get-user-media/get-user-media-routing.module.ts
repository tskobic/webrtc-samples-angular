import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './components/audio/audio.component';
import { BasicGetUserMediaComponent } from './components/basic-get-user-media/basic-get-user-media.component';
import { CanvasGetUserMediaComponent } from './components/canvas-get-user-media/canvas-get-user-media.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExposureComponent } from './components/exposure/exposure.component';
import { FilterGetUserMediaComponent } from './components/filter-get-user-media/filter-get-user-media.component';
import { PanTiltZoomComponent } from './components/pan-tilt-zoom/pan-tilt-zoom.component';
import { RecordComponent } from './components/record/record.component';
import { ResolutionGetUserMediaComponent } from './components/resolution-get-user-media/resolution-get-user-media.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'basic', component: BasicGetUserMediaComponent},
    { path: 'canvas', component: CanvasGetUserMediaComponent},
    { path: 'filter', component: FilterGetUserMediaComponent},
    { path: 'resolution', component: ResolutionGetUserMediaComponent},
    { path: 'audio', component: AudioComponent},
    { path: 'record', component: RecordComponent},
    { path: 'pan-tilt-zoom', component: PanTiltZoomComponent},
    { path: 'exposure', component: ExposureComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetUserMediaRoutingModule { }
