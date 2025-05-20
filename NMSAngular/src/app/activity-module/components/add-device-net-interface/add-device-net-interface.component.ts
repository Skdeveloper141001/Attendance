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
  selector: 'app-add-device-net-interface',
  templateUrl: './add-device-net-interface.component.html',
  styleUrl: './add-device-net-interface.component.scss'
})
export class AddDeviceNetInterfaceComponent {

  statusOptions = ['up', 'down'];
  devices: any[] = []; // your existing device array
  deviceList:any;
  devicesList: any;
  devicegroup:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddDeviceNetInterfaceComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  deviceNetform = new FormGroup({
    // id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    device_id: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
   // group_id: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    interface_name: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    ip_address: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    mac_address: new FormControl('', [Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/) ]),
    status: new FormControl('', [ Validators.required, Validators.pattern('^(up|down)$')]),
    speed: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),

  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.deviceNetform.patchValue({
        device_id: d.device_id,
        interface_name:d.interface_name,
        ip_address:d.ip_address,
        mac_address:d.mac_address,
        status:d.status,
        speed:d.speed
       

      });
    }
   this.fetchDeviceList()
   
  }


  fetchDeviceList() {
    this.apiService.getData('dGroupmap/devices').subscribe(response => {
      console.log('deviceInfoList', response);
      this.devicesList = response;
       // <-- ADD THIS LINE
    });
}



  getTable() {
    this.apiService.getData('dNetinterface').subscribe(response => {
      console.log('deviceList', response);
      this.deviceList = response;
      this.deviceinfo.data = this.deviceList; // <-- ADD THIS LINE
    });
  }

onSubmit() {
  // Log for debugging
  console.log("Before patch:", this.deviceNetform.value);

  const formValue = this.deviceNetform.value;

   const payload = {
          ...formValue,
  
       };

   this.apiService.postData('dNetinterface', payload).subscribe(response => {
   console.log('Response:', response);
    alert("Data saved successfully.");
        });
        this.getTable();
        this.onClear();
}


onUpdate(id:any): void {
  if (this.deviceNetform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }

  const formValue = this.deviceNetform.value;

  const payload = {
    ...formValue,
   // id: this.data.device.id, // Include device ID for update

  };

  this.apiService.putData('dNetinterface/'+id, payload).subscribe({
    next: (response) => {
      console.log('Update response:', response);
      alert("Device Network Interface updated successfully.");
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
  this.deviceNetform.reset();
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
