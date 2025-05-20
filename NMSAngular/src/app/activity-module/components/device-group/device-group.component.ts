
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddDeviceGroupComponent } from '../add-device-group/add-device-group.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';

@Component({
  selector: 'app-device-group',
  templateUrl: './device-group.component.html',
  styleUrl: './device-group.component.scss'
})
export class DeviceGroupComponent implements OnInit{

 



constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

devicegroup = new MatTableDataSource<any>();
filterValue = '';
devicegroupList:any;

displayedColumns: string[] = [
  'name','icon', 'description','actions'
  ];

 
deviceform = new FormGroup({
  
  name: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
  
});


ngOnInit(): void {
  this.devicegroupList = []; // load your device list
  this.devicegroup.data = this.devicegroupList;
  this.getdevicegroup();

}



applyFilter() {
const filterText = this.filterValue.trim().toLowerCase();
this.devicegroup.filter = filterText;
}



openAddDeviceWindow() {
  const dialogRef = this.dialog.open(AddDeviceGroupComponent , {
    
    maxWidth: '90vw',
   
  });
}


getdevicegroup() {
  this.apiService.getData('dGroup').subscribe(response => {
    console.log('deviceList', response);
    this.devicegroupList = response;
    this.devicegroup.data = this.devicegroupList; // <-- ADD THIS LINE
  });
  }


onEdit(device: any) {
  // logic to edit device
}

onDelete(device: any) {
// confirm and delete device
}
}
