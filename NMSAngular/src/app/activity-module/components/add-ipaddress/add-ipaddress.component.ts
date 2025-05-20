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
import { hostname } from 'os';
@Component({
  selector: 'app-add-ipaddress',
  templateUrl: './add-ipaddress.component.html',
  styleUrl: './add-ipaddress.component.scss'
})
export class AddIPAddressComponent {

  statusOptions = ['up', 'down', 'Maintenance'];
  devices: any[] = []; // your existing device array
  roomList:any;
  deviceList: any;
  subnetList: any;
  rooms:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddIPAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  ipsubnetform = new FormGroup({
   
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
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.ipsubnetform.patchValue({
        device_id: d.device_id,
        ip_address:d.ip_address,
        subnet_id:d.subnet_id,
        description:d.description,
        mac_address:d.mac_address,
        status:d.status,
        hostname:d.hostname,
        // last_seen: this.datepipe.transform(d.last_seen, 'yyyy-MM-dd'),
       

      });
    }
   this.fetchdeviceList()
   this.fetchSubnetList();
   
  }


  fetchdeviceList() {
    this.apiService.getData('ipaddress/device').subscribe(response => {
      console.log('DeviceList', response);
      this.deviceList = response;
       // <-- ADD THIS LINE
    });
}

fetchSubnetList() {
  this.apiService.getData('ipaddress/subnet').subscribe(response => {
    console.log('subnetList', response);
    this.subnetList = response;
     // <-- ADD THIS LINE
  });
}




onSubmit() {
  // Log for debugging
  if (this.ipsubnetform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }
  console.log("Before patch:", this.ipsubnetform.value);

  const formValue = this.ipsubnetform.value;

   const payload = {
          ...formValue,
          last_seen: this.datepipe.transform(formValue.last_seen, 'yyyy-MM-dd'),
       };

   this.apiService.postData('ipaddress', payload).subscribe(response => {
   console.log('Response:', response);
    alert("Data saved successfully.");
        });
        
        this.onClear();
}


onUpdate(id:any): void {
  if (this.ipsubnetform.invalid) {
    alert("Please fill out the form correctly.");
    return;
  }

  const formValue = this.ipsubnetform.value;

  const payload = {
    ...formValue,
   // id: this.data.device.id, // Include device ID for update

  };

  this.apiService.putData('ipaddress/'+id, payload).subscribe({
    next: (response) => {
      console.log('Update response:', response);
      alert("IP subnets updated successfully.");
      this.dialogRef?.close('updated');
    },
    error: (err) => {
      console.error("Update failed", err);
      alert("Update failed. Check console for errors.");
    }
  });
  
  this.onClear();
}

onClear(){
  this.ipsubnetform.reset();
  }
  onClose(): void {
    
    this.dialogRef.close();
    
  }
}
