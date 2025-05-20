import { Component ,ElementRef} from '@angular/core';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // <-- Important
import { Router } from '@angular/router';  // ✅ Import this
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {

  
  devices: any[] = []; // your existing device array
  roomList:any;
  floorList: any;
  rooms:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddRoomComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  roomform = new FormGroup({
    // id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    
    floor_id: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
    name:new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
    description:new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
   // group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
   //room_id:  new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
   latitude:new FormControl('',[Validators.required,]),
   longitude:new FormControl('',[Validators.required,]),

  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.roomform.patchValue({
        floor_id: d.floor_id,
        name:d.name,
        description:d.description,
        latitude:d.latitude,
        longitude:d.longitude

       // group_id: d.gid,

      });
    }
   this.fetchFloorList()
   //this.fetchRoomList()
  }


  fetchFloorList() {
    this.apiService.getData('rooms/floors').subscribe(response => {
      console.log('floorList', response);
      this.floorList = response;
       // <-- ADD THIS LINE
    });
}


// fetchRoomList() {
//   this.apiService.getData('dLocation/rooms').subscribe(response => {
//     console.log('Room', response);
//     this.rooms = response;
//      // <-- ADD THIS LINE
//   });
// }
  getTable() {
    this.apiService.getData('rooms').subscribe(response => {
      console.log('RoomList', response);
      this.roomList = response;
      this.deviceinfo.data = this.roomList; // <-- ADD THIS LINE
    });
  }

onSubmit() {
  // Log for debugging
  if (this.roomform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }
  console.log("Before patch:", this.roomform.value);

  const formValue = this.roomform.value;

   const payload = {
          ...formValue,
  
       };

   this.apiService.postData('rooms', payload).subscribe(response => {
   console.log('Response:', response);
    alert("Data saved successfully.");
        });
        this.getTable();
        this.onClear();
}


onUpdate(id:any): void {
  if (this.roomform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }

  const formValue = this.roomform.value;

  const payload = {
    ...formValue,
   // id: this.data.device.id, // Include device ID for update

  };

  this.apiService.putData('rooms/'+id, payload).subscribe({
    next: (response) => {
      console.log('Update response:', response);
      alert("room updated successfully.");
      this.dialogRef?.close('updated');
    },
    error: (err) => {
      console.error("Update failed", err);
      alert("Update failed. Check console for errors.");
    }
  });
  this.getTable();
  this.onClear();
}

onClear(){
  this.roomform.reset();
  }
  onClose(): void {
    this.getTable();
    this.dialogRef.close();
    
  }
}
