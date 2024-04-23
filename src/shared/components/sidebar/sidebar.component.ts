import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router'; 
import { GlobalService } from '../../../core/service/global';
import { StorageService } from '../../../core/service/storage/storage.service';
import { CommonModule } from '@angular/common'; 
import { ButtonComponent } from '../button/button.component'; 
import { MenuComponent } from '../menu/menu.component';
import { AuthService } from '../../../app/auth/services/auth.service';
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)
 

@Component({
  selector: 'app-sidebar', 
  standalone: true,
  imports: [   
    ButtonComponent, 
    CommonModule,
    MenuComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isShow : boolean = false; 
  @Input() type : "SideLanding" | 'SideDashboard' = "SideLanding";
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  sidebarArray$ = this.globalsrv.getSidebar(); 
  userSession

  public get typeClass(): string[] {
    return getStyles(this.type)
  }


  constructor(
    private globalsrv: GlobalService,
    private storgaesrv: StorageService,
    private router : Router,
    public authsrv: AuthService
  ) {
    this.userSession = this.storgaesrv.isAuthenticated;
  }

  ngOnInit(): void { 
  
  }

  onHiddenSidenav(){
    this.closed.emit(false);
  }

  onActive(url : string){ 
    this.onHiddenSidenav();
  }
 
  onNavigate(url: string){
    this.router.navigateByUrl(url);
  }

  onCerrarSession(){
  //  this.storgaesrv.removeData(STORAGE_KEY.sessionUser)
    this.authsrv.logout();
    this.closed.emit(false);
    this.onNavigate('/');
  }
}