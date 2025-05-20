import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModuleRoutingModule } from './layout-module-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CollectModule } from '../collect/collect.module';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutModuleRoutingModule,
    CollectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  
  ]
})
export class LayoutModuleModule { }
