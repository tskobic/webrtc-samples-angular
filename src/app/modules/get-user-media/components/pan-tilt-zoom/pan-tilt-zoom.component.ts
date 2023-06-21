import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-pan-tilt-zoom',
  templateUrl: './pan-tilt-zoom.component.html',
  styleUrls: ['./pan-tilt-zoom.component.scss'],
})
export class PanTiltZoomComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('pan') pan!: MatSlider;
  @ViewChild('tilt') tilt!: MatSlider;
  @ViewChild('zoom') zoom!: MatSlider;

  constraints = {
    video: {
      pan: true,
      tilt: true,
      zoom: true,
    },
  };
  controls!: { [key: string]: MatSlider };
  stream!: MediaStream;
  track!: MediaStreamTrack;
  buttonDisabled = false;
  errorMessage = '';

  ngAfterViewInit(): void {
    this.controls = { pan: this.pan, tilt: this.tilt, zoom: this.zoom };
  }

  async onClick() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stream = await (navigator.mediaDevices as any).getUserMedia(
        this.constraints
      );
      this.stream = stream;
      const videoTracks = stream.getVideoTracks();
      console.log('Got stream with constraints:', this.constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      this.video.nativeElement.srcObject = stream;

      const [track] = videoTracks;
      this.track = track;
      const capabilities = track.getCapabilities();
      const settings = track.getSettings();

      Object.keys(this.controls).forEach((key) => {
        if (!(key in settings)) {
          this.showErrorMessage(`Camera does not support ${key}.`);
        } else {
          const control = this.controls[key];
          control.min = capabilities[key].min;
          control.max = capabilities[key].max;
          control.step = capabilities[key].step;
          control._input.value = settings[key];
          control.disabled = false;
        }
      });
      this.buttonDisabled = true;
    } catch (err) {
      this.handleError(err);
    }
  }

  async applyConstraints(value: number, control: string) {
    try {
      const constraints = { advanced: [{ [control]: value }] };
      await this.track.applyConstraints(constraints);
    } catch (err) {
      console.error('applyConstraints() failed: ', err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any) {
    if (error.name === 'NotAllowedError') {
      this.showErrorMessage(
        'Permissions have not been granted to use your camera, ' +
          'you need to allow the page access to your devices in ' +
          'order for the demo to work.'
      );
    }
    this.showErrorMessage(`getUserMedia error: ${error.name}`, error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private showErrorMessage(message: string, err?: any) {
    this.errorMessage = message;
    console.log(message);
    if (typeof err !== 'undefined') {
      console.error(err);
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }
}
