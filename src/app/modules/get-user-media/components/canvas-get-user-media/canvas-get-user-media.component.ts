import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-canvas-get-user-media',
  templateUrl: './canvas-get-user-media.component.html',
  styleUrls: ['./canvas-get-user-media.component.scss'],
})
export class CanvasGetUserMediaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  stream!: MediaStream;

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      this.stream = stream;
      this.video.nativeElement.srcObject = stream;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }

  async onClick() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }
}
