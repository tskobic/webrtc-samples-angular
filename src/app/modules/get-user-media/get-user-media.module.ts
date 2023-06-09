import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetUserMediaRoutingModule } from './get-user-media-routing.module';
import { BasicGetUserMediaComponent } from './components/basic-get-user-media/basic-get-user-media.component';
import { SharedModule } from '../../shared/shared.module';
import { CanvasGetUserMediaComponent } from './components/canvas-get-user-media/canvas-get-user-media.component';
import { FilterGetUserMediaComponent } from './components/filter-get-user-media/filter-get-user-media.component';
import { ResolutionGetUserMediaComponent } from './components/resolution-get-user-media/resolution-get-user-media.component';
import { AudioComponent } from './components/audio/audio.component';
import { RecordComponent } from './components/record/record.component';
import { PanTiltZoomComponent } from './components/pan-tilt-zoom/pan-tilt-zoom.component';
import { ExposureComponent } from './components/exposure/exposure.component';

@NgModule({
  declarations: [
    BasicGetUserMediaComponent,
    CanvasGetUserMediaComponent,
    FilterGetUserMediaComponent,
    ResolutionGetUserMediaComponent,
    AudioComponent,
    RecordComponent,
    PanTiltZoomComponent,
    ExposureComponent
  ],
  imports: [
    CommonModule,
    GetUserMediaRoutingModule,
    SharedModule
  ],
})
export class GetUserMediaModule { }
