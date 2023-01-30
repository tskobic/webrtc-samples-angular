import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-get-user-media',
  templateUrl: './filter-get-user-media.component.html',
  styleUrls: ['./filter-get-user-media.component.scss'],
})
export class FilterGetUserMediaComponent implements AfterViewInit, OnDestroy {
  selectedOption: string = 'none';

  currentClasses: Record<string, boolean> = {
    none: true,
    blur: false,
    grayscale: false,
    invert: false,
    sepia: false,
  };

  options = ['none', 'blur', 'grayscale', 'invert', 'sepia'];

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  stream!: MediaStream;

  constructor() {}

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      this.stream = stream;
      this.video.nativeElement.srcObject = stream;
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }

  async onClick() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.className = `canvas ${this.selectedOption}`;
    canvas
      .getContext('2d')
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  setClass() {
    Object.keys(this.currentClasses).forEach((key) => {
      if (key == this.selectedOption) {
        this.currentClasses[key] = true;
      } else {
        this.currentClasses[key] = false;
      }
    });
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
