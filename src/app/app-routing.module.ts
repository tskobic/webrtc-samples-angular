import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'get-user-media',
    loadChildren: () =>
      import('./modules/get-user-media/get-user-media.module').then(
        (m) => m.GetUserMediaModule
      ),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./modules/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'rtc-peer-connection',
    loadChildren: () =>
      import('./modules/rtc-peer-connection/rtc-peer-connection.module').then((m) => m.RtcPeerConnectionModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
