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
  selector: 'app-add-device-group-map',
  templateUrl: './add-device-group-map.component.html',
  styleUrl: './add-device-group-map.component.scss'
})
export class AddDeviceGroupMapComponent {


  devices: any[] = []; // your existing device array
  deviceList:any;
  devicesList: any;
  devicegroup:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddDeviceGroupMapComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  deviceform = new FormGroup({
    // id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    device_id: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),

    group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),


  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.deviceform.patchValue({
        device_id: d.did,
        group_id: d.gid,

      });
    }
   this.fetchDeviceList()
   this.fetchgroupList()
  }


  fetchDeviceList() {
    this.apiService.getData('dGroupmap/devices').subscribe(response => {
      console.log('deviceInfoList', response);
      this.devicesList = response;
       // <-- ADD THIS LINE
    });
}


fetchgroupList() {
  this.apiService.getData('dGroupmap/group').subscribe(response => {
    console.log('devicesGroupList', response);
    this.devicegroup = response;
     // <-- ADD THIS LINE
  });
}
  getTable() {
    this.apiService.getData('dGroupmap').subscribe(response => {
      console.log('deviceList', response);
      this.deviceList = response;
      this.deviceinfo.data = this.deviceList; // <-- ADD THIS LINE
    });
  }

onSubmit() {
  // Log for debugging
  console.log("Before patch:", this.deviceform.value);

  const formValue = this.deviceform.value;

   const payload = {
          ...formValue,
  
       };

   this.apiService.postData('dGroupmap', payload).subscribe(response => {
   console.log('Response:', response);
    alert("Data saved successfully.");
        });
        this.getTable();
        this.onClear();
}


onUpdate(id:any): void {
  if (this.deviceform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }

  const formValue = this.deviceform.value;

  const payload = {
    ...formValue,
   // id: this.data.device.id, // Include device ID for update

  };

  this.apiService.putData('dGroupmap/'+id, payload).subscribe({
    next: (response) => {
      console.log('Update response:', response);
      alert("Device updated successfully.");
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
  this.deviceform.reset();
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
