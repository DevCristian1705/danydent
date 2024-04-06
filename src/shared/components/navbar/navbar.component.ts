import { Component, Input} from '@angular/core';  
import { Router } from '@angular/router'; 
import { GlobalService } from '../../../core/service/global';
import { StorageService } from '../../../core/service/storage/storage.service';
import { STORAGE_KEY } from '../../../core/constants/storage';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports	:[
    CommonModule, ButtonComponent, SidebarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  
  @Input() type: "Dashboard" | "Classic" = "Classic";
  isSidebar : boolean = false;
  navbarArray$ = this.globalsrv.getNavBar();
  userSession  

  public get typeClass(): string[] {
    return getStyles(this.type)
  }


  constructor(
    private globalsrv: GlobalService,
    private storgaesrv : StorageService,
    private router: Router
  ) {  
    this.userSession = this.storgaesrv.isAuthenticated; 
  }
   
  onNavigate(url:string){
    this.router.navigateByUrl(url);
  } 

  onContraerMenu(){
      this.storgaesrv.removeData(STORAGE_KEY.sessionUser);
  }

  onActiveSideBar(isActive : boolean){
    this.isSidebar = isActive; 
  }

 

}
