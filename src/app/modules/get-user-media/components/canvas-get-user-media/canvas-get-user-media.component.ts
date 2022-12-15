import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-get-user-media',
  templateUrl: './canvas-get-user-media.component.html',
  styleUrls: ['./canvas-get-user-media.component.scss']
})
export class CanvasGetUserMediaComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
      this.video.nativeElement.srcObject = stream;
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }

  async onClick() {
    const video = this.video.nativeElement as HTMLVideoElement;
    const canvas = this.canvas.nativeElement as HTMLCanvasElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
}
