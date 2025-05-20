import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectModule } from '../collect/collect.module';
import { ActivityModuleRoutingModule } from './activity-module-routing.module';
import { DeviceInfoComponent } from './components/device-info/device-info.component';
import { DeviceGroupComponent } from './components/device-group/device-group.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AddDeviceinfoComponent } from './components/add-deviceinfo/add-deviceinfo.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AddDeviceGroupComponent } from './components/add-device-group/add-device-group.component';
import { AddLocationsComponent } from './components/add-locations/add-locations.component';
import { ActSidebarComponent } from './components/act-sidebar/act-sidebar.component';
import { SidebarComponent } from '../layout-module/components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceGroupMapComponent } from './components/device-group-map/device-group-map.component';
import { AddDeviceGroupMapComponent } from './components/add-device-group-map/add-device-group-map.component';
import { DeviceNetInterfaceComponent } from './components/device-net-interface/device-net-interface.component';
import { AddDeviceNetInterfaceComponent } from './components/add-device-net-interface/add-device-net-interface.component';
import { DeviceLocationComponent } from './components/device-location/device-location.component';
import { AddDeviceLocationComponent } from './components/add-device-location/add-device-location.component';
import { RoomComponent } from './components/room/room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { FloorComponent } from './components/floor/floor.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { IPSubnetComponent } from './components/ipsubnet/ipsubnet.component';
import { AddIPSubnetComponent } from './components/add-ipsubnet/add-ipsubnet.component';
import { IPAddressComponent } from './components/ipaddress/ipaddress.component';
import { AddIPAddressComponent } from './components/add-ipaddress/add-ipaddress.component';


@NgModule({
  declarations: [
    DeviceInfoComponent,
    DeviceGroupComponent,
    LocationsComponent,
    AddDeviceinfoComponent,
    AddDeviceGroupComponent,
    AddLocationsComponent,
    ActSidebarComponent,
    DashboardComponent,
    DeviceGroupMapComponent,
    AddDeviceGroupMapComponent,
    DeviceNetInterfaceComponent,
    AddDeviceNetInterfaceComponent,
    DeviceLocationComponent,
    AddDeviceLocationComponent,
    RoomComponent,
    AddRoomComponent,
    FloorComponent,
    AddFloorComponent,
    IPSubnetComponent,
    AddIPSubnetComponent,
    IPAddressComponent,
    AddIPAddressComponent
  ],
  imports: [
    CommonModule,
    ActivityModuleRoutingModule,
    CollectModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
       
      }
    }),
  
    
  ],
  providers: [
    provideClientHydration(),
   // provideAnimationsAsync(),
    [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
  ],
})
export class ActivityModuleModule { }
