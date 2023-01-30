import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/shared/static/constants';

@Component({
  selector: 'app-resolution-get-user-media',
  templateUrl: './resolution-get-user-media.component.html',
  styleUrls: ['./resolution-get-user-media.component.scss']
})
export class ResolutionGetUserMediaComponent implements OnInit, OnDestroy {
  resConstraints = Constants.ResolutionConstraints;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  stream!: MediaStream;
  dimensions = '';
  errorMessage = '';
  currentWidth = 0;
  currentHeight = 0;
  width!: number;
  sizeLock = false;
  aspectLock = false;
  showVideoBlock = false;

  constructor() { }

  ngOnInit(): void {
  }

  async getMedia(resType: string) {
    if (this.stream) {
      this.stream?.getTracks().forEach(track => {
        track.stop();
      });
    }
    this.clearErrorMessage();
    this.showVideoBlock = false;
    const constraints = this.resConstraints.find(x => x.name == resType)?.constraints;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.gotStream();
    } catch (error: any) {
      this.showErrorMessage(error.message, error.name);
    }
  }

  gotStream() {
    this.showVideoBlock = true;
    const video = this.video.nativeElement;
    video.srcObject = this.stream;
    const track = this.stream.getVideoTracks()[0];
    const constraints = track.getConstraints();
    const width = constraints?.width as ConstrainULongRange;
    console.log('Result constraints: ' + JSON.stringify(constraints));
    if (constraints && width && width.exact) {
      this.width = width.exact;
    } else if (constraints && width && width.min) {
      this.width = width.min;
    }
  }

  async constraintChange(width: number) {
    this.width = width;
    const track = this.stream.getVideoTracks()[0];
    const video = this.video.nativeElement;
    let constraints: MediaTrackConstraints;
    if (this.aspectLock) {
      constraints = {
        width: { exact: width },
        aspectRatio: {
          exact: video.videoWidth / video.videoHeight
        }
      };
    } else {
      constraints = { width: { exact: width } };
    }
    this.clearErrorMessage();
    console.log('applying ' + JSON.stringify(constraints));
    try {
      await track.applyConstraints(constraints);
      console.log('applyConstraint success');
      this.displayVideoDimensions('applyConstraints');
    } catch (error: any) {
      this.showErrorMessage('applyConstraints', error.name)
    }
  }

  displayVideoDimensions(whereSeen: string) {
    const video = this.video.nativeElement;
    if (video.videoWidth) {
      this.dimensions = 'Actual video dimensions: ' + video.videoWidth +
        'x' + video.videoHeight + 'px.';
      if (this.currentWidth !== video.videoWidth ||
        this.currentHeight !== video.videoHeight) {
        console.log(whereSeen + ': ' + this.dimensions);
        this.currentWidth = video.videoWidth;
        this.currentHeight = video.videoHeight;
      }
    } else {
      this.dimensions = 'Video not ready';
    }
  }

  sizeLockChange() {
    const video = this.video.nativeElement;
    if (this.sizeLock) {
      console.log('Setting fixed size');
      video.style.width = '100%';
    } else {
      console.log('Setting auto size');
      video.style.width = 'auto';
    }
  }

  showErrorMessage(who: string, what: string) {
    const message = who + ': ' + what;
    this.errorMessage = message;
    console.log(message);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
