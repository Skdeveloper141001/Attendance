import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDeviceGroupMapComponent } from '../add-device-group-map/add-device-group-map.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';

@Component({
  selector: 'app-device-group-map',
  templateUrl: './device-group-map.component.html',
  styleUrl: './device-group-map.component.scss'
})
export class DeviceGroupMapComponent {

  
  constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  devicegroup = new MatTableDataSource<any>();
  filterValue = '';
  devicegroupList:any;
  selectedMap:any;
  displayedColumns: string[] = [
    'name','icon', 'description','actions'
    ];
  
   
  deviceform = new FormGroup({
    
    device_id: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    
  });
  
  
  ngOnInit(): void {
    this.devicegroupList = []; // load your device list
    this.devicegroup.data = this.devicegroupList;
    this.getdevicegroupmap();
  
  }
  
  
  
  applyFilter() {
  const filterText = this.filterValue.trim().toLowerCase();
  this.devicegroup.filter = filterText;
  }
  
  
  
  openAddDeviceWindow() {
    const dialogRef = this.dialog.open(AddDeviceGroupMapComponent , {
      
      maxWidth: '90vw',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.getdevicegroupmap(); // ✅ Fix here
    
    });
  }
  
  
  getdevicegroupmap() {
    this.apiService.getData('dGroupmap').subscribe(response => {
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
            device_id: this.selectedMap.did,
          
            group_id: this.selectedMap.gid,

          });
      
          // Open dialog to show form (optional)
          const dialogRef = this.dialog.open(AddDeviceGroupMapComponent , {
            maxWidth: '90vw',
            data: { device: this.selectedMap, isEdit: true } // ✅ pass device only
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'updated') {
              this.getdevicegroupmap(); // ✅ Fix here
            }
          });
  }
  
  onDelete(id: any) {
  // confirm and delete device
  this.apiService.deleteData('dGroupmap/'+id).subscribe(response => {
    console.log('deviceList', response);
    console.log('Update response:', response);
    alert("Device Group Map Delete successfully.");
    // <-- ADD THIS LINE
    this.getdevicegroupmap();
  });
  }
}
