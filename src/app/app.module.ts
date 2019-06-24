import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent, RegisterRequest } from './register/register.component';
import { ShareComponent } from './share/share.component';
//import { SafePipe } from './sagePipe';

const approutes : Routes = [
  {path:'' , component:LoginComponent},
  {path:'upload' , component:FormUploadComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'register',component:RegisterComponent},
  {path:'share' , component:ShareComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormUploadComponent,
    DashboardComponent,
    RegisterComponent,
    ShareComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(approutes),
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
