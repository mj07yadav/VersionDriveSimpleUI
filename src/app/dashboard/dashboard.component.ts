import { Component, OnInit } from '@angular/core';
import { FileListService, FileObjectForTransfere } from '../file-list.service';
import { DomSanitizer} from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userid=sessionStorage.getItem("userid");
  fileListobject:FileObjectForTransfere[];
  viewfileurls=[];
  downloadfileurls=[];
  viewflag=[];
  fileType:String[]=[];
  private bodyText: string;

  constructor(private filelistservice:FileListService,sanitizer: DomSanitizer,private modalService: NgbModal) {

      this.filelistservice.getListOfFiles().subscribe(data=>{
          this.fileListobject=data;
          //http://localhost:8080/viewdownload/view/{{userid}}/
          for(let i=0;i<this.fileListobject.length;i++){
              console.log("http://localhost:8080/viewdownload/view/"+this.userid+"/"+this.fileListobject[i].fileid);
              this.viewfileurls.push("http://localhost:8080/viewdownload/view/"+this.userid+"/"+this.fileListobject[i].fileid);
              this.downloadfileurls.push("http://localhost:8080/viewdownload/download/"+this.userid+"/"+this.fileListobject[i].fileid);
              this.viewflag.push(false);
              let name:String=this.fileListobject[i].filename;
              let type=name.substring((name.length-3),name.length);
              if(type === 'png' || type==='jpg'){
                  this.fileType.push('image');
                  this.viewfileurls[i]=sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
              }else if(type === 'mp3'){
                  this.fileType.push('audio');
                  this.viewfileurls[i]=sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
              }else if(type === 'mkv' || type===  'mp4'){
                  this.fileType.push('video');
                  this.viewfileurls[i]=sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
              }else if(type === 'pdf' || type === 'doc'){
                this.fileType.push('PDF');
                this.viewfileurls[i]=sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
              }
              //console.log((name.length-(name.length-3))+"  "+name+" "+name.length+"  "+type+" t "+this.fileType);
          }
      });
    // this.fileListobject=this.filelistservice.listOfFiles[0];
    //  console.log(this.fileListobject.fileid);
   }

   ngOnInit() {
    
}
    view(index){
        this.viewflag[index]=!this.viewflag[index];
    }

    download(index){
      window.open(this.downloadfileurls[index]);
    }
    closeResult: string;
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


}
