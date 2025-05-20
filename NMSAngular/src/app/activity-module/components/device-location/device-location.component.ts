import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDeviceLocationComponent } from '../add-device-location/add-device-location.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';

@Component({
  selector: 'app-device-location',
  templateUrl: './device-location.component.html',
  styleUrl: './device-location.component.scss'
})
export class DeviceLocationComponent {

  constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  devicegroup = new MatTableDataSource<any>();
  filterValue = '';
  devicegroupList:any;
  selectedMap:any;
  displayedColumns: string[] = [
    'Device_name','room_name','latitude','longitude','actions'
    ];
  
   
  deviceform = new FormGroup({
    
    device_id: new FormControl(null),
    room_id: new FormControl(null),
    latitude:new FormControl(''),
    longitude:new FormControl(''),


  });
  
  
  ngOnInit(): void {
    this.devicegroupList = []; // load your device list
    this.devicegroup.data = this.devicegroupList;
    this.getdeviceLocationMap();
  
  }
  
  
  applyFilter() {
  const filterText = this.filterValue.trim().toLowerCase();
  this.devicegroup.filter = filterText;
  }
  
  
  
  openAddDeviceWindow() {
    const dialogRef = this.dialog.open(AddDeviceLocationComponent , {
      
      maxWidth: '90vw',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.getdeviceLocationMap(); // ✅ Fix here
    
    });
  }
  
  
  getdeviceLocationMap() {
    this.apiService.getData('dLocation').subscribe(response => {
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
      
          this.deviceform.patchValue({
            device_id: this.selectedMap.device_id,
            room_id: this.selectedMap.room_id,
            latitude:this.selectedMap.latitude,
            longitude:this.selectedMap.longitude
            

          });
      
          // Open dialog to show form (optional)
          const dialogRef = this.dialog.open(AddDeviceLocationComponent , {
            maxWidth: '90vw',
            data: { device: this.selectedMap, isEdit: true } // ✅ pass device only
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'updated') {
              this.getdeviceLocationMap(); // ✅ Fix here
            }
          });
  }
  
  onDelete(id: any) {
  // confirm and delete device
  this.apiService.deleteData('dLocation/'+id).subscribe(response => {
    console.log('deviceList', response);
    console.log('Update response:', response);
    alert("Device Network Interface Delete successfully.");
    // <-- ADD THIS LINE
    this.getdeviceLocationMap();
  });
  }
}
