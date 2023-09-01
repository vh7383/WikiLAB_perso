import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from './users/users.component';
import { ListPageComponent } from './list-page/list-page.component';
import { FroalaEditorModule } from "angular-froala-wysiwyg";
import { UserService } from "./services/user.service";
import { ErrorInterceptor } from "./services/error.interceptor";
import { HttpInterceptor} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NavbarComponent,
    HomePageComponent,
    EditPageComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ListPageComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FroalaEditorModule,
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
