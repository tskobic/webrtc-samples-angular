import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements AfterViewInit {

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  async ngAfterViewInit() {
    var test:MediaStream;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const audioTracks = stream.getAudioTracks();
      console.log('Using audio device: ' + audioTracks[0].label);
      this.audio.nativeElement.srcObject = stream;
    } catch (error: any) {
      console.log(error.message, error.name);
    }
  }
}
