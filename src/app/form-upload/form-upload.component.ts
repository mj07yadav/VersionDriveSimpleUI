import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpResponse, HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
 
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
 
  constructor(private uploadService: UploadFileService, private http:HttpClient) { }
 
  ngOnInit() {
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
 
    this.selectedFiles = undefined;
  }

    // reader(){
    //   //const header = new HttpHeaders().set("Authorization",`Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNcml0dW5qYXkiLCJleHAiOjE1NjEyNDE2NzEsImlhdCI6MTU2MTIyMzY3MX0.6E9rKQcddP7Zi8FhNqDPJPNfaSpcTxF5oaG9ff2730Z6NClonPC2OR4-FBi35ptsKmqdn31_wrIlGDu7mA-gGA`);
    //   window.open('http://localhost:8080/viewdownload/view/2/3');
    // }
    // imageflag=false;
    // viewimage(){
    //   this.imageflag=!this.imageflag;
    // }
    // pdfflag=false;
    // reader2(){
    //   window.open('http://localhost:8080/viewdownload/view/2/5');
    // }
    // viewpdf(){
    //   this.pdfflag=!this.pdfflag;
    // }

}