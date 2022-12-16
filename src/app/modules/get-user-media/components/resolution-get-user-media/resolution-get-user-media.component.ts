import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const RES_CONSTRAINTS = [
  {
    name: 'qvga',
    constraints: {
      video: {
        width: { exact: 320 }, height: { exact: 240 }
      }
    }
  },
  {
    name: 'vga',
    constraints: {
      video: {
        width: { exact: 640 }, height: { exact: 480 }
      }
    }
  },
  {
    name: 'hd',
    constraints: {
      video: {
        width: { exact: 1280 }, height: { exact: 720 }
      }
    }
  },
  {
    name: 'fullHd',
    constraints: {
      video: {
        width: { exact: 1920 }, height: { exact: 1080 }
      }
    }
  },
  {
    name: 'televisionFourK',
    constraints: {
      video: {
        width: { exact: 3840 }, height: { exact: 2160 }
      }
    }
  },
  {
    name: 'cinemaFourK',
    constraints: {
      video: {
        width: { exact: 4096 }, height: { exact: 2160 }
      }
    }
  },
  {
    name: 'eightK',
    constraints: {
      video: {
        width: { exact: 7680 }, height: { exact: 4320 }
      }
    }
  }
]

@Component({
  selector: 'app-resolution-get-user-media',
  templateUrl: './resolution-get-user-media.component.html',
  styleUrls: ['./resolution-get-user-media.component.scss']
})
export class ResolutionGetUserMediaComponent implements OnInit {
  stream!: MediaStream;
  @ViewChild('video') video!: ElementRef;
  resConstraints = RES_CONSTRAINTS;

  constructor() { }

  ngOnInit(): void {
  }

  async getMedia(resType: string) {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
    }

    const constraints = this.resConstraints.find(x => x.name == resType)?.constraints;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = this.video.nativeElement as HTMLVideoElement;
      video.srcObject = this.stream;
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }
}
