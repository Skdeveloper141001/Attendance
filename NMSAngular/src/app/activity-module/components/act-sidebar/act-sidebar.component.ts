import { Component,inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { race } from 'rxjs';
@Component({
  selector: 'app-act-sidebar',
  templateUrl: './act-sidebar.component.html',
  styleUrl: './act-sidebar.component.scss'
})
export class ActSidebarComponent {

  
  isHandset: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        shareReplay()
      )
      .subscribe(isHandset => this.isHandset = isHandset);
  }
}
