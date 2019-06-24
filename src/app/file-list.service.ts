import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

export class FileObjectForTransfere{
    
      public fileid;
    public filename;
    public creationDate;


}

@Injectable({
  providedIn: 'root'
})
export class FileListService implements OnInit {
  listOfFiles:FileObjectForTransfere[];


  ngOnInit(): void {
    
  }

  constructor(private http:HttpClient) { }

  getListOfFiles(){
    
    const header = new HttpHeaders().set("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
     return this.http.get<FileObjectForTransfere[]>('http://localhost:8080/viewdownload/getallfiles/'+sessionStorage.getItem("userid"), {headers:header});
     //.subscribe(
    //   response=>{
    //     for(let i=0; i< response.length;i++){
    //       let temp=new FileObjectForTransfere();
    //       temp.creationDate=response[i].creationDate.toString();
    //       temp.fileid=response[i].fileid;
    //       temp.filename=response[i].filename;
    //       //this.listOfFiles.push(temp);
    //       console.log(response[i].fileid+" "+response[i].filename+" "+response[i].creationDate.toString());
    //     }
    //   }
    // );
  }

}
