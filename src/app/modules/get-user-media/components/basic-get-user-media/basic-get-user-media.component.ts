import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-basic-get-user-media',
  templateUrl: './basic-get-user-media.component.html',
  styleUrls: ['./basic-get-user-media.component.scss']
})
export class BasicGetUserMediaComponent implements OnInit {
  @ViewChild('video') video!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  async onClick() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
      const videoTracks = stream.getVideoTracks();
      console.log(videoTracks);
      this.video.nativeElement.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  }
}
