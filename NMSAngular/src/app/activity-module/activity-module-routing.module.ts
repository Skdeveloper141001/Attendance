import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceInfoComponent } from './components/device-info/device-info.component';
import { DeviceGroupComponent } from './components/device-group/device-group.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ActSidebarComponent } from './components/act-sidebar/act-sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceGroupMapComponent } from './components/device-group-map/device-group-map.component';
import { DeviceNetInterfaceComponent } from './components/device-net-interface/device-net-interface.component';
import { DeviceLocationComponent } from './components/device-location/device-location.component';
import { RoomComponent } from './components/room/room.component';
import { IPSubnetComponent } from './components/ipsubnet/ipsubnet.component';
import { IPAddressComponent } from './components/ipaddress/ipaddress.component';
const routes: Routes = [
  {
    path:"sidebar",
    component:ActSidebarComponent,
    children:[
      // {
      //   path:'',redirectTo:'dashboard',pathMatch:'full'
      // },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:"deviceinfo",
        component:DeviceInfoComponent
      },
      {
        path:"devicegroup",
        component:DeviceGroupComponent
      },
      {
        path:"locations",
        component:LocationsComponent
      },
      {
        path:"groupmap",
        component:DeviceGroupMapComponent
      },
      {
        path:"networkinterface",
        component:DeviceNetInterfaceComponent
      },
      {
        path:"devicelocation",
        component:DeviceLocationComponent
      },
      {
        path:"rooms",
        component:RoomComponent
      },
      {
        path:"ipsubnet",
        component:IPSubnetComponent
      }
      ,
      {
        path:"ipaddress",
        component:IPAddressComponent
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityModuleRoutingModule { }
