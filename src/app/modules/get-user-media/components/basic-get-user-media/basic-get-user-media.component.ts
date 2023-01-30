import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-basic-get-user-media',
  templateUrl: './basic-get-user-media.component.html',
  styleUrls: ['./basic-get-user-media.component.scss']
})
export class BasicGetUserMediaComponent implements OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  stream!: MediaStream;

  constructor() { }

  async onClick() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      this.stream = stream;
      const videoTracks = stream.getVideoTracks();
      console.log(videoTracks);
      this.video.nativeElement.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
