import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtcPeerConnectionRoutingModule } from './rtc-peer-connection-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RtcPeerConnectionRoutingModule,
    SharedModule
  ]
})
export class RtcPeerConnectionModule { }
