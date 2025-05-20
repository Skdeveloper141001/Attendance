import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDeviceNetInterfaceComponent } from '../add-device-net-interface/add-device-net-interface.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';

@Component({
  selector: 'app-device-net-interface',
  templateUrl: './device-net-interface.component.html',
  styleUrl: './device-net-interface.component.scss'
})
export class DeviceNetInterfaceComponent {

  constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  devicegroup = new MatTableDataSource<any>();
  filterValue = '';
  devicegroupList:any;
  selectedMap:any;
  displayedColumns: string[] = [
    'interface_name','Device_name',"mac_address","ip_address",'status','speed','actions'
    ];
  
   
  deviceNetform = new FormGroup({
    
    device_id: new FormControl(null),
    //group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    interface_name: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    ip_address: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    mac_address: new FormControl('', [Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/) ]),
    status: new FormControl('', [ Validators.required, Validators.pattern('^(up|down)$')]),
    speed: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
  });
  
  
  ngOnInit(): void {
    this.devicegroupList = []; // load your device list
    this.devicegroup.data = this.devicegroupList;
    this.getdeviceNetMap();
  
  }
  
  
  applyFilter() {
  const filterText = this.filterValue.trim().toLowerCase();
  this.devicegroup.filter = filterText;
  }
  
  
  
  openAddDeviceWindow() {
    const dialogRef = this.dialog.open(AddDeviceNetInterfaceComponent , {
      
      maxWidth: '90vw',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.getdeviceNetMap(); // ✅ Fix here
      
    });
  }
  
  
  getdeviceNetMap() {
    this.apiService.getData('dNetinterface').subscribe(response => {
      console.log('deviceList', response);
      this.devicegroupList = response;
      this.devicegroup.data = this.devicegroupList; // <-- ADD THIS LINE
    });
    }
  
  
  onEdit(id: any) {
    // logic to edit device
    this.selectedMap = this.devicegroupList.find((device: any) => device.id === parseInt(id));
      
        console.log("Editing device:", this.selectedMap);
      
        // if (this.selectedDevice) {
          //this.id = id;
      
          this.deviceNetform.patchValue({
            device_id: this.selectedMap.device_id,
            interface_name:this.selectedMap.interface_name,
            status:this.selectedMap.status,
            mac_address:this.selectedMap.mac_address,
            ip_address:this.selectedMap.ip_address,
            speed:this.selectedMap.speed,
            

          });
      
          // Open dialog to show form (optional)
          const dialogRef = this.dialog.open(AddDeviceNetInterfaceComponent , {
            maxWidth: '90vw',
            data: { device: this.selectedMap, isEdit: true } // ✅ pass device only
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'updated') {
              this.getdeviceNetMap(); // ✅ Fix here
            }
          });
  }
  
  onDelete(id: any) {
  // confirm and delete device
  this.apiService.deleteData('dNetinterface/'+id).subscribe(response => {
    console.log('deviceList', response);
    console.log('Update response:', response);
    alert("Device Network Interface Delete successfully.");
    // <-- ADD THIS LINE
    this.getdeviceNetMap();
  });
  }
}
