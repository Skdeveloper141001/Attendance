import { Component,ElementRef } from '@angular/core';
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
import { LocationsComponent } from '../locations/locations.component';
import { DeviceinfoService } from '../../../service/deviceinfo.service';
@Component({
  selector: 'app-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrl: './add-locations.component.scss'
})

  export class AddLocationsComponent implements OnInit {
    locationform !: FormGroup;
  
    City = [{ name: 'New York' }, { name: 'Los Angeles' }];
    State = [{ name: 'California' }, { name: 'Texas' }];
    Country = [{ name: 'USA' }, { name: 'Canada' }];
  
    constructor(private fb: FormBuilder,private apiService: DeviceinfoService ,private datepipe:DatePipe,private http: HttpClient,@Optional() private dialogRef: MatDialogRef<AddLocationsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    ngOnInit(): void {
      this.locationform = this.fb.group({
        name: ['', Validators.required],
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        latitude: [''],
        longitude: ['']
      });
    }
    onSubmit(){


    }
    onUpdate(){
      
    }
    onClose(): void {
      this.dialogRef.close();
    } 
}