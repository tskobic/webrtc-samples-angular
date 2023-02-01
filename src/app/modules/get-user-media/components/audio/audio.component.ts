import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements AfterViewInit, OnDestroy {

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  stream!: MediaStream;

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      this.stream = stream;
      const audioTracks = stream.getAudioTracks();
      console.log('Using audio device: ' + audioTracks[0].label);
      this.audio.nativeElement.srcObject = stream;
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
