import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss']
})
export class ExposureComponent implements OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  videoTrackSettings = ['exposureMode', 'exposureTime', 'exposureCompensation', 'brightness', 'whiteBalanceMode'];
  stream!: MediaStream;
  videoTrack!: MediaStreamTrack;
  errorMessage = '';
  exposureModes = [];
  selectedExposureMode: string | null = null;
  whiteBalanceModes = [];
  selectedWhiteBalanceMode: string | null = null;


  constructor() { }

  async onClick() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      this.stream = stream;
      [this.videoTrack] = stream.getVideoTracks();
      console.log(this.videoTrack);
      this.video.nativeElement.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  }

  loadProperties(refreshValuesOnly: boolean) {
    const capabilities = this.videoTrack.getCapabilities();
    const settings = this.videoTrack.getSettings();
    console.log('Capabilities: ', capabilities);
    console.log('Settings: ', settings);

    for (const property of this.videoTrackSettings) {
      if (!(property in settings)) {
        this.errorMsg(`Camera does not support ${property}.`);
        continue;
      }
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }

  private errorMsg(msg: string, error?: unknown) {
    this.errorMessage = msg;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
}
