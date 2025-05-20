import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddIPAddressComponent } from '../add-ipaddress/add-ipaddress.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
@Component({
  selector: 'app-ipaddress',
  templateUrl: './ipaddress.component.html',
  styleUrl: './ipaddress.component.scss'
})
export class IPAddressComponent {

  
  constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  devicegroup = new MatTableDataSource<any>();
  filterValue = '';
  devicegroupList:any;
  selectedMap:any;
  displayedColumns: string[] = [
    'subnet','ip_address', 'devicename','mac_address','status','hostname','description','lastseen','actions'
    ];
  
 deviceform = new FormGroup({
    
  ip_address:new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
  device_id:new FormControl('',[Validators.required,]),
  subnet_id:new FormControl('',[Validators.required,]),
  mac_address:new FormControl(''),
  status: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
  hostname:new FormControl(''),
  //status: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
  description:new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
  last_seen: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),


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
    const dialogRef = this.dialog.open(AddIPAddressComponent , {
      
      maxWidth: '90vw',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      
        this.getdeviceLocationMap(); // ✅ Fix here
    
    });
  }
  
  
  getdeviceLocationMap() {
    this.apiService.getData('ipaddress').subscribe(response => {
      console.log('ipaddressList', response);
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
            subnet_id: this.selectedMap.subnet_id,
            ip_address:this.selectedMap.ip_address,
            mac_address:this.selectedMap.mac_address,
            status:this.selectedMap.status,
            hostname:this.selectedMap.hostname,
            description:this.selectedMap.description,
            last_seen:this.selectedMap.last_seen
          
          });
      
          // Open dialog to show form (optional)
          const dialogRef = this.dialog.open(AddIPAddressComponent , {
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
  this.apiService.deleteData('ipaddress/'+id).subscribe(response => {
    console.log('deviceList', response);
    console.log('Update response:', response);
    alert("Device Network Interface Delete successfully.");
    // <-- ADD THIS LINE
    this.getdeviceLocationMap();
  });
  }
}
