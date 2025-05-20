import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog'; 
import { LoginComponent } from '../login/login.component';
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AppComponent } from '../../../app.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private dialog: MatDialog,private router: Router,@Inject(PLATFORM_ID) private platformId: Object) { } 

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '100vw',
      // height: '100vh',
      // maxWidth: '100vw',
      // panelClass: 'full-screen-modal',
      width: '450px',
      maxWidth: '90vw',
      panelClass: 'login-dialog',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
      if (result === 'success') {
        // Login successful - navigate to sidebar
        this.router.navigate(['/activity/sidebar']);
      }
    });
}



stats = [
  { label: 'Device ', target: 102, count: 0, icon: 'sentiment_satisfied' },
  { label: 'Category', target: 21, count: 0, icon: 'assignment' },
  { label: 'Floors', target: 80, count: 0, icon: 'headset_mic' },
  { label: 'Rooms', target: 15, count: 0, icon: 'group' },
];

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.stats.forEach((stat, index) => this.animateCount(stat, index));
  }
}

animateCount(stat: any, index: number): void {
  const stepTime = Math.max(20, Math.floor(2000 / stat.target));
  let current = 0;

  const interval = setInterval(() => {
    current++;
    this.stats[index].count = current;
    if (current >= stat.target) clearInterval(interval);
  }, stepTime);
}

currentYear: number = new Date().getFullYear();

}
