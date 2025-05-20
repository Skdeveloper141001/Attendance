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
  selector: 'app-add-deviceinfo',
  templateUrl: './add-deviceinfo.component.html',
  styleUrl: './add-deviceinfo.component.scss'
})
export class AddDeviceinfoComponent implements OnInit{

  makes = ['Cisco', 'Juniper', 'HP', 'Dell', 'Other'];
  statusOptions = ['up', 'down', 'Maintenance'];
  snmpVersions = ['v1', 'v2c', 'v3'];
  snmpCommunities = ['Public', 'Private', 'Custom'];

  devices: any[] = []; // your existing device array
  deviceList:any;
  deviceTypes: any[] = [];

   deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddDeviceinfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  deviceform = new FormGroup({
    // id: new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    devicename: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    mac_address: new FormControl('', [Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/) ]),
    device_type: new FormControl('', [  Validators.required,  Validators.maxLength(30)]),
    make: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    model: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    // os: new FormControl('', [ Validators,Validators.maxLength(50)]),
    serial_number: new FormControl('', [ Validators.maxLength(100)]), // optional
    status: new FormControl('', [ Validators.required, Validators.pattern('^(up|down)$')]),
    // organization_serial_no: new FormControl('', [Validators]),
    // snmp_enabled: new FormControl('', [Validators.required,Validators.pattern('^[01]$')]),
    snmp_version: new FormControl('', [Validators.required]),
    snmp_community: new FormControl('', [ Validators.maxLength(50)]),// Required dynamically if snmp_enabled === '1'
    sys_descr: new FormControl('', [ Validators.required]),
    sys_name: new FormControl('', [Validators.required,Validators.maxLength(100)  ]),
    // is_monitored: new FormControl('', [Validators.required,Validators.pattern('^[01]$') ]),
    added_on: new FormControl('', [Validators.required]),
    purchase_date: new FormControl('', [Validators.required]),
    first_installation_date: new FormControl('', [Validators.required  ]),
    // delete_flag: new FormControl('', [ Validators, Validators.pattern('^[YN]$')])
    snmp_enabled: new FormControl(false, Validators.required),
    is_monitored: new FormControl(false, Validators.required),

  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.deviceform.patchValue({
        devicename: d.devicename,
        mac_address: d.mac_address,
        device_type: d.device_type,
        make: d.make,
        model: d.model,
        serial_number: d.serial_number,
        status: d.status,
        snmp_version: d.snmp_version,
        snmp_community: d.snmp_community,
        sys_descr: d.sys_descr,
        sys_name: d.sys_name,
        added_on: this.datepipe.transform(d.added_on, 'yyyy-MM-dd'),
        purchase_date: this.datepipe.transform(d.purchase_date, 'yyyy-MM-dd'),
        first_installation_date: this.datepipe.transform(d.first_installation_date, 'yyyy-MM-dd'),
        snmp_enabled: d.snmp_enabled === '1' || d.snmp_enabled === 1,
        is_monitored: d.is_monitored === '1' || d.is_monitored === 1
      });
    }
   this. fetchDeviceTypes()
  }


  fetchDeviceTypes() {
this.http.get<any[]>('http://localhost:5000/api/devicetype').subscribe(
(data: any[]) => {
  this.deviceTypes = data;
},
(error: any) => console.error('Error fetching device types:', error)
);
}

  getTable() {
    this.apiService.getData('device').subscribe(response => {
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
       snmp_version: String(formValue.snmp_version), // ensure it's stringng
       snmp_enabled: formValue.snmp_enabled ? 1 : 0,
       is_monitored: formValue.is_monitored ? 1 : 0,
       purchase_date: this.datepipe.transform(formValue.purchase_date, "yyyy-MM-dd"),
       first_installation_date: this.datepipe.transform(formValue.first_installation_date, "yyyy-MM-dd"),
      added_on: this.datepipe.transform(new Date(), "yyyy-MM-dd")
       };
  console.log('payload',payload);
   this.apiService.postData('device', payload).subscribe(response => {
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
    snmp_version: String(formValue.snmp_version),
    snmp_enabled: formValue.snmp_enabled ? 1 : 0,
    is_monitored: formValue.is_monitored ? 1 : 0,
    purchase_date: this.datepipe.transform(formValue.purchase_date, "yyyy-MM-dd"),
    first_installation_date: this.datepipe.transform(formValue.first_installation_date, "yyyy-MM-dd"),
    added_on: this.datepipe.transform(formValue.added_on, "yyyy-MM-dd")
  };

  this.apiService.putData('device/'+id, payload).subscribe({
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
