import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-exposure',
  templateUrl: './exposure.component.html',
  styleUrls: ['./exposure.component.scss'],
})
export class ExposureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('exposureTime') exposureTime!: MatSlider;
  @ViewChild('exposureCompensation') exposureCompensation!: MatSlider;
  @ViewChild('brightness') brightness!: MatSlider;

  controls!: { [key: string]: MatSlider };
  videoTrackSettings = [
    'exposureMode',
    'exposureTime',
    'exposureCompensation',
    'brightness',
    'whiteBalanceMode',
  ];
  arraySettings: { [key: string]: string[] } = {
    exposureMode: [],
    whiteBalanceMode: [],
  };
  selectedValues: { [key: string]: string | null } = {
    exposureMode: null,
    whiteBalanceMode: null,
  };
  disabled: { [key: string]: boolean } = {
    openCamera: false,
    exposureMode: true,
    whiteBalanceMode: true,
    refreshControls: true,
  };
  stream!: MediaStream;
  videoTrack!: MediaStreamTrack;
  errorMessage = '';

  ngAfterViewInit(): void {
    this.controls = {
      exposureTime: this.exposureTime,
      exposureCompensation: this.exposureCompensation,
      brightness: this.brightness,
    };
  }

  async init() {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.stream = stream;
      [this.videoTrack] = stream.getVideoTracks();

      console.log('Got stream with constraints:', constraints);
      console.log(`Using video device: ${this.videoTrack.label}`);

      this.video.nativeElement.srcObject = stream;
      this.loadProperties(false);

      this.disabled['refreshControls'] = false;
      this.disabled['openCamera'] = true;
    } catch (error) {
      this.handleError(error);
    }
  }

  loadProperties(refreshValuesOnly: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const capabilities = this.videoTrack.getCapabilities() as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = this.videoTrack.getSettings() as any;
    console.log('Capabilities: ', capabilities);
    console.log('Settings: ', settings);

    for (const property of this.videoTrackSettings) {
      if (!(property in settings)) {
        this.showErrorMessage(`Camera does not support ${property}.`);
        continue;
      }
      if (Array.isArray(capabilities[property])) {
        if (!refreshValuesOnly) {
          this.arraySettings[property] = capabilities[property];
        }

        this.selectedValues[property] = settings[property];
        this.disabled[property] = false;
      } else {
        const control = this.controls[property];
        control.min = capabilities[property].min;
        control.max = capabilities[property].max;
        control.step = capabilities[property].step;
        control._input.value = settings[property];
        control.disabled = false;
      }
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  async onSelect(event: MatSelectChange, property: string) {
    await this.applyConstraints(event.value, property);
  }

  async applyConstraints(value: string | number, property: string) {
    try {
      const constraints: MediaTrackConstraints = {
        advanced: [{ [property]: value }],
      };
      await this.videoTrack.applyConstraints(constraints);

      console.log('Did successfully apply new constraints: ', constraints);
      console.log('New camera settings: ', this.videoTrack.getSettings());
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

  private showErrorMessage(message: string, error?: unknown) {
    this.errorMessage = message;
    console.log(message);
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
}
