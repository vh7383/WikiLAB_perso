import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from "@angular/forms";
import { UsersComponent } from './users/users.component';
import { ListPageComponent } from './list-page/list-page.component';
import {FroalaEditorModule} from "angular-froala-wysiwyg";
import {UserService} from "./services/user.service";

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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
