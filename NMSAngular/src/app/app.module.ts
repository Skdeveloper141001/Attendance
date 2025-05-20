import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CollectModule } from './collect/collect.module';
import { HttpClient } from '@angular/common/http';
//import { SidebarComponent } from './layout-module/components/sidebar/sidebar.component';
import { SharedModuleComponent } from './shared-module/shared-module.component';
import { LayoutModuleComponent } from './layout-module/layout-module.component';
import { ActivityModuleComponent } from './activity-module/activity-module.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedModuleComponent,
    LayoutModuleComponent,
    ActivityModuleComponent,
    //SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollectModule,
    HttpClientModule
    
   
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
