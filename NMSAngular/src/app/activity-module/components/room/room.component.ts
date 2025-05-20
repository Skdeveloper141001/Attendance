import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddRoomComponent } from '../add-room/add-room.component';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router'; 
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

   constructor( private apiService: DeviceinfoService ,private dialog: MatDialog,private router: Router) { }
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    rooms = new MatTableDataSource<any>();
    filterValue = '';
    roomList:any;
    selectedRoom:any;
    displayedColumns: string[] = [
      'name','Floor_name','description','latitude','longitude','actions'
      ];
    
     
    roomform = new FormGroup({
      

      floor_id: new FormControl(null),
      name:new FormControl(''),
      description:new FormControl(''),
      latitude:new FormControl(''),
      longitude:new FormControl(''),
  
  
    });
    
    
    ngOnInit(): void {
      this.roomList = []; // load your device list
      this.rooms.data = this.roomList;
      this.getRoom();
    
    }
    
    
    applyFilter() {
    const filterText = this.filterValue.trim().toLowerCase();
    this.rooms.filter = filterText;
    }
    
    
    
    openAddDeviceWindow() {
      const dialogRef = this.dialog.open(AddRoomComponent , {
        
        maxWidth: '90vw',
       
      });

      dialogRef.afterClosed().subscribe(result => {
        
          this.getRoom(); // ✅ Fix here
        
      });
    }
    
    
    getRoom() {
      this.apiService.getData('rooms').subscribe(response => {
        console.log('RoomsList', response);
        this.roomList = response;
        this.rooms.data = this.roomList; // <-- ADD THIS LINE
      });
      }
    
    
    onEdit(id: any) {
      // logic to edit device
      this.selectedRoom = this.roomList.find((device: any) => device.id === parseInt(id));
        
          console.log("Editing Rooms:", this.selectedRoom);
        
          // if (this.selectedDevice) {
            //this.id = id;
        
            this.roomform.patchValue({
              floor_id: this.selectedRoom.floor_id,
              name: this.selectedRoom.name,
              description:this.selectedRoom.description,
              latitude:this.selectedRoom.latitude,
              longitude:this.selectedRoom.longitude
              
  
            });
        
            // Open dialog to show form (optional)
            const dialogRef = this.dialog.open(AddRoomComponent , {
              maxWidth: '90vw',
              data: { device: this.selectedRoom, isEdit: true } // ✅ pass device only
            });
        
            dialogRef.afterClosed().subscribe(result => {
              if (result === 'updated') {
                this.getRoom(); // ✅ Fix here
              }
            });
    }
    
    onDelete(id: any) {
    // confirm and delete device
    this.apiService.deleteData('rooms/'+id).subscribe(response => {
      console.log('rooms', response);
      console.log('Update response:', response);
      alert("Room Delete successfully.");
      // <-- ADD THIS LINE
      this.getRoom();
    });
    }
}
