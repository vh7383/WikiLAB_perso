import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PageViewComponent } from './page-view/page-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NavbarComponent,
    PageViewComponent,
    HomePageComponent,
    EditPageComponent,
    SinglePageComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
