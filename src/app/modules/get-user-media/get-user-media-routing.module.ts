import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './components/audio/audio.component';
import { BasicGetUserMediaComponent } from './components/basic-get-user-media/basic-get-user-media.component';
import { CanvasGetUserMediaComponent } from './components/canvas-get-user-media/canvas-get-user-media.component';
import { DashboardComponent } from '../../shared/components/dashboard/dashboard.component';
import { ExposureComponent } from './components/exposure/exposure.component';
import { FilterGetUserMediaComponent } from './components/filter-get-user-media/filter-get-user-media.component';
import { PanTiltZoomComponent } from './components/pan-tilt-zoom/pan-tilt-zoom.component';
import { RecordComponent } from './components/record/record.component';
import { ResolutionGetUserMediaComponent } from './components/resolution-get-user-media/resolution-get-user-media.component';


const childrenRoutes: Routes = [
  { path: 'basic', title: 'Basic demo', component: BasicGetUserMediaComponent, },
  { path: 'canvas', title: 'Canvas snapshot', component: CanvasGetUserMediaComponent },
  { path: 'filter', title: 'Canvas snapshot + Filter', component: FilterGetUserMediaComponent },
  { path: 'resolution', title: 'Select resolution', component: ResolutionGetUserMediaComponent },
  { path: 'audio', title: 'Audio', component: AudioComponent },
  { path: 'record', title: 'Record', component: RecordComponent },
  { path: 'pan-tilt-zoom', title: 'Pan-Tilt-Zoom', component: PanTiltZoomComponent },
  { path: 'exposure', title: 'Exposure', component: ExposureComponent }
];

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { routes: childrenRoutes }, children: childrenRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetUserMediaRoutingModule { }
