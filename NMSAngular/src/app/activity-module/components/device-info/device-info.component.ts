import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDeviceinfoComponent } from '../add-deviceinfo/add-deviceinfo.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrl: './device-info.component.scss'
})
export class DeviceInfoComponent implements OnInit{

  
  deviceform = new FormGroup({
    id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    devicename: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    mac_address: new FormControl('', [Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/) ]),
    device_type: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    make: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    model: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    // os: new FormControl('', [ Validators,Validators.maxLength(50)]),
    serial_number: new FormControl('', [ Validators.maxLength(100)]), // optional
    status: new FormControl('', [ Validators.required, Validators.pattern('^(up|down)$')]),
    // organization_serial_no: new FormControl('', [Validators]),
    // snmp_enabled: new FormControl('', [Validators.required,Validators.pattern('^[01]$')]),
    snmp_version: new FormControl('', [Validators.required]),
    snmp_community: new FormControl('', [ Validators.maxLength(50)]),// Required dynamically if snmp_enabled === '1'
    sys_descr: new FormControl('', [ Validators.required]),
    sys_name: new FormControl('', [Validators.required,Validators.maxLength(100)  ]),
    // is_monitored: new FormControl('', [Validators.required,Validators.pattern('^[01]$') ]),
    added_on: new FormControl('', [Validators.required]),
    purchase_date: new FormControl('', [Validators.required]),
    first_installation_date: new FormControl('', [Validators.required  ]),
    // delete_flag: new FormControl('', [ Validators, Validators.pattern('^[YN]$')])
    snmp_enabled: new FormControl(false, Validators.required),
    is_monitored: new FormControl(false, Validators.required),

  });

deviceList:any;
id: number | null = null; // ✅ Add this
selectedDevice: any;
// deviceList = []; // Should be populated via service/API
displayedColumns: string[] = [
'devicename', 'mac_address', 'device_type', 'make', 'model', 'serial_number',
'status', 'snmp_version', 'snmp_community', 'sys_name',
'purchase_date', 'first_installation_date', 'snmp_enabled', 'is_monitored', 'actions'
];

constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private dialog: MatDialog,private router: Router) { }

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

deviceinfo = new MatTableDataSource<any>();
filterValue = '';

ngOnInit(): void {
this.deviceList = []; // load your device list
this.deviceinfo.data = this.deviceList;
this.getdeviceinfo();

}

getdeviceinfo() {
this.apiService.getData('device').subscribe(response => {
  console.log('deviceList', response);
  this.deviceList = response;
  this.deviceinfo.data = this.deviceList; // <-- ADD THIS LINE
});
}

applyFilter() {
const filterText = this.filterValue.trim().toLowerCase();
this.deviceinfo.filter = filterText;
}




openAddDeviceWindow() {
  const dialogRef = this.dialog.open(AddDeviceinfoComponent , {
    maxWidth: '90vw',
    panelClass: 'custom-dialog-container',
  });
}


  onEdit(id: any) {
    // Find the selected device based on id
    this.selectedDevice = this.deviceList.find((device: any) => device.id === parseInt(id));
  
    console.log("Editing device:", this.selectedDevice);
  
    // if (this.selectedDevice) {
      this.id = id;
  
      this.deviceform.patchValue({
        devicename: this.selectedDevice.devicename,
        mac_address: this.selectedDevice.mac_address,
        device_type: this.selectedDevice.device_type,
        make: this.selectedDevice.make,
        model: this.selectedDevice.model,
        serial_number: this.selectedDevice.serial_number,
        status: this.selectedDevice.status,
        snmp_version: this.selectedDevice.snmp_version,
        snmp_community: this.selectedDevice.snmp_community,
        sys_descr: this.selectedDevice.sys_descr,
        sys_name: this.selectedDevice.sys_name,
        added_on: this.selectedDevice.added_on,
        purchase_date: this.selectedDevice.purchase_date,
        first_installation_date: this.selectedDevice.first_installation_date,
        snmp_enabled: this.selectedDevice.snmp_enabled,
        is_monitored: this.selectedDevice.is_monitored
      });
  
      // Open dialog to show form (optional)
      const dialogRef = this.dialog.open(AddDeviceinfoComponent , {
        maxWidth: '90vw',
        data: { device: this.selectedDevice, isEdit: true } // ✅ pass device only
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.getdeviceinfo(); // ✅ Fix here
        }
      });
    }
  


onDelete(device: any) {
// confirm and delete device
}
}
