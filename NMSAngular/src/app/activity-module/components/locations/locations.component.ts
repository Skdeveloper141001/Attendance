//import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddLocationsComponent } from '../add-locations/add-locations.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit{

  
  locationsList:any;
  displayedColumns: string[] = ['name','address','city','state','country','latitude','longitude','actions'];
  
 
  
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private dialog: MatDialog,private router: Router) { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  locationsDataSource = new MatTableDataSource<Location>();
  filterValue = '';
  
  ngOnInit(): void {
  this.locationsList = []; // load your device list
  this. locationsDataSource.data = this.locationsList;
  this.getlocation();
  
  }
  
  getlocation() {
  this.apiService.getData('locations').subscribe(response => {
    console.log('deviceList', response);
    this.locationsList = response;
    this. locationsDataSource.data = this.locationsList; // <-- ADD THIS LINE
  });
  }
  
  applyFilter() {
  const filterText = this.filterValue.trim().toLowerCase();
  this. locationsDataSource.filter = filterText;
  }
  
  
  
  openAddDeviceWindow() {
    const dialogRef = this.dialog.open(AddLocationsComponent , {
      maxWidth: '90vw',
    });
  }

  onEdit(device: any) {
    // logic to edit device
  }
  
  onDelete(device: any) {
  // confirm and delete device
  }
}
