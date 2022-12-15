import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetUserMediaRoutingModule } from './get-user-media-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BasicGetUserMediaComponent } from './components/basic-get-user-media/basic-get-user-media.component';
import { SharedModule } from '../../shared/shared.module';
import { CanvasGetUserMediaComponent } from './components/canvas-get-user-media/canvas-get-user-media.component';
import { FilterGetUserMediaComponent } from './components/filter-get-user-media/filter-get-user-media.component';

@NgModule({
  declarations: [DashboardComponent, BasicGetUserMediaComponent, CanvasGetUserMediaComponent, FilterGetUserMediaComponent],
  imports: [CommonModule, GetUserMediaRoutingModule, SharedModule],
})
export class GetUserMediaModule { }
