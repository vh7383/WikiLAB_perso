import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {UsersComponent} from "./users/users.component";
import {PagesComponent} from "./pages/pages.component";
import {DetailPageComponent} from "./detail-page/detail-page.component";

const routes: Routes = [
  { path: '',/* redirectTo: '/', pathMatch: 'full', */component: HomePageComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'edit-page', component: EditPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'pages/:id', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }