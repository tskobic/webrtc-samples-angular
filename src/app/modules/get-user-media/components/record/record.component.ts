import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('record') recordedVideo!: ElementRef<HTMLVideoElement>;

  stream!: MediaStream;
  mediaRecorder!: MediaRecorder;

  startButton = false;
  recordButton = true;
  playButton = true;
  downloadButton = true;
  echo = false;
  codecSelect = true;
  recordButtonText = 'Start Recording';
  mimeTypes = this.getSupportedMimeTypes();
  selectedOption = this.mimeTypes[0];
  recordedBlobs: BlobPart[] = [];

  async onStart() {
    this.startButton = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280, height: 720
        }, audio: { echoCancellation: this.echo }
      });
      this.stream = stream;
      this.recordButton = false;
      console.log('getUserMedia() got stream:', stream);
      this.video.nativeElement.srcObject = stream;
      this.codecSelect = false;
    } catch (error) {
      console.log(error);
    }
  }

  onRecord() {
    if (this.recordButtonText === 'Start Recording') {
      this.startRecording();
    } else {
      this.stopRecording();
      this.recordButtonText = 'Start Recording';
      this.playButton = false;
      this.downloadButton = false;
      this.codecSelect = false;
    }
  }

  onPlay() {
    const mimeType = this.selectedOption.split(';', 1)[0];
    const superBuffer = new Blob(this.recordedBlobs, { type: mimeType });
    this.recordedVideo.nativeElement.src = '';
    this.recordedVideo.nativeElement.srcObject = null;
    this.recordedVideo.nativeElement.src = window.URL.createObjectURL(superBuffer);
    this.recordedVideo.nativeElement.controls = true;
    this.recordedVideo.nativeElement.play();
  }

  onDownload() {
    const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  private startRecording() {
    this.recordedBlobs = [];
    const options = { mimeType: this.selectedOption };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      return;
    }

    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    this.recordButtonText = 'Stop Recording';
    this.playButton = true;
    this.downloadButton = true;
    this.codecSelect = true;
    this.mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', this.recordedBlobs);
    };
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    this.mediaRecorder.start();
    console.log('MediaRecorder started', this.mediaRecorder);
  }

  private stopRecording() {
    this.mediaRecorder.stop();
  }

  private getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
  }

  handleDataAvailable = (event: BlobEvent) => {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }

  ngOnDestroy() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
