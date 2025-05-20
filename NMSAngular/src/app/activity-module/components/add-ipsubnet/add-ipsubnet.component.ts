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
  selector: 'app-add-ipsubnet',
  templateUrl: './add-ipsubnet.component.html',
  styleUrl: './add-ipsubnet.component.scss'
})
export class AddIPSubnetComponent {

  
  devices: any[] = []; // your existing device array
  roomList:any;
  floorList: any;
  rooms:any;
  deviceinfo = new MatTableDataSource<any>();
  constructor( private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddIPSubnetComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) { }

  
  ipsubnetform = new FormGroup({
   
   name:new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
   cidr_block:new FormControl('',[Validators.required,]),
   gateway:new FormControl('',[Validators.required,]),
   vlan_id:new FormControl('',[Validators.required,]),
   location_id: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
   description:new FormControl('', [ Validators.required, Validators.maxLength(100) ]),


  });
  
  ngOnInit(): void {
    if (this.data?.isEdit && this.data?.device) {
      const d = this.data.device;
  
      this.ipsubnetform.patchValue({
        location_id: d.location_id,
        name:d.name,
        cidr_block:d.cidr_block,
        description:d.description,
        vlan_id:d.vlan_id,
        gateway:d.gateway

       

      });
    }
   this.fetchlocationList()
   
  }


  fetchlocationList() {
    this.apiService.getData('ipsubnets/location').subscribe(response => {
      console.log('LocationList', response);
      this.floorList = response;
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
  
       };

   this.apiService.postData('ipsubnets', payload).subscribe(response => {
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

  this.apiService.putData('ipsubnets/'+id, payload).subscribe({
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
