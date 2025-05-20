import { Component,ElementRef } from '@angular/core';
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
  selector: 'app-add-device-location',
  templateUrl: './add-device-location.component.html',
  styleUrl: './add-device-location.component.scss'
})
export class AddDeviceLocationComponent {

  
  
  devices: any[] = []; // your existing device array
  deviceList:any;
  devicesList: any;
  rooms:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddDeviceLocationComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  deviceLocationform = new FormGroup({
    // id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    device_id: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
   // group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
   room_id:  new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
   latitude:new FormControl('',[Validators.required,]),
   longitude:new FormControl('',[Validators.required,]),

  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.deviceLocationform.patchValue({
        device_id: d.device_id,
        room_id:d.room_id,
        latitude:d.latitude,
        longitude:d.longitude

       // group_id: d.gid,

      });
    }
   this.fetchDeviceList()
   this.fetchRoomList()
  }


  fetchDeviceList() {
    this.apiService.getData('dGroupmap/devices').subscribe(response => {
      console.log('deviceInfoList', response);
      this.devicesList = response;
       // <-- ADD THIS LINE
    });
}


fetchRoomList() {
  this.apiService.getData('dLocation/rooms').subscribe(response => {
    console.log('Room', response);
    this.rooms = response;
     // <-- ADD THIS LINE
  });
}
  getTable() {
    this.apiService.getData('dLocation').subscribe(response => {
      console.log('deviceList', response);
      this.deviceList = response;
      this.deviceinfo.data = this.deviceList; // <-- ADD THIS LINE
    });
  }

onSubmit() {
  // Log for debugging
  if (this.deviceLocationform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }
  console.log("Before patch:", this.deviceLocationform.value);

  const formValue = this.deviceLocationform.value;

   const payload = {
          ...formValue,
  
       };

   this.apiService.postData('dLocation', payload).subscribe(response => {
   console.log('Response:', response);
    alert("Data saved successfully.");
        });
        this.getTable();
        this.onClear();
}


onUpdate(id:any): void {
  if (this.deviceLocationform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }

  const formValue = this.deviceLocationform.value;

  const payload = {
    ...formValue,
   // id: this.data.device.id, // Include device ID for update

  };

  this.apiService.putData('dLocation/'+id, payload).subscribe({
    next: (response) => {
      console.log('Update response:', response);
      alert("Device Location Map updated successfully.");
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
  this.deviceLocationform.reset();
  }
  onClose(): void {
    this.getTable();
    this.dialogRef.close();
    
  }
}
