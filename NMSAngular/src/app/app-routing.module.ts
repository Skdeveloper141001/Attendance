import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'/layout/home',pathMatch:'full'
      },
  {
    path:"layout",
    loadChildren:()=>import('./layout-module/layout-module.module')
    .then(mod=>mod.LayoutModuleModule)
  },
  {
    path:"activity",
    loadChildren:()=>import('./activity-module/activity-module.module')
    .then(mod=>mod.ActivityModuleModule)
  },
  {
    path:"shared",
    loadChildren:()=>import('./shared-module/shared-module.module')
    .then(mod=>mod.SharedModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
