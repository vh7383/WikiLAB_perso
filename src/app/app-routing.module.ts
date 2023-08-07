import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageViewComponent } from "./page-view/page-view.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { SinglePageComponent } from "./single-page/single-page.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '',/* redirectTo: '/', pathMatch: 'full', */component: HomePageComponent },
  { path: 'pages', component: PageViewComponent },
  { path: 'pages/:id', component: SinglePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }