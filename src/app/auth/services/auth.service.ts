import { Injectable } from '@angular/core'; 
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, from, of, tap } from 'rxjs';
import { DialogMessageComponent } from '../../../shared/dialog/dialog-message/dialog-message.component';
import { messageAuth, messageType } from '../../../core/constants/message-type';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_FIREBASE, STORAGE_KEY } from '../../../core/constants/storage';
import { StorageService } from '../../../core/service/storage/storage.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  
  constructor(
    private fireauthsrv : AngularFireAuth,
    private router : Router,
    private storagesrv : StorageService,
    public dialog: MatDialog
  ) {
    this.onValidLocalStorage();
  }

  onValidLocalStorage(){
    this.fireauthsrv.authState.subscribe((user) => {
      if (user) { 
        this.userData = user;
        this.storagesrv.setData(STORAGE_KEY.sessionUser,this.userData) 
      } else {localStorage.setItem('user', 'null')}
    });
  }

  login(email : string, password : string){ 
    this.fireauthsrv.signInWithEmailAndPassword(email, password)
    .then((userCredential) => this.userData = userCredential.user)
    .catch((error) => this.onValidError(error.code, 'login'));
  }

  loginGoogle(){    
    this.fireauthsrv.signInWithPopup(new GoogleAuthProvider())
    .then((resp) => console.log(resp))
    .catch((error) =>console.log(error));
  }

  register(email : string, password : string){
    this.fireauthsrv.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => this.userData = userCredential.user)
    .catch((error) => this.onValidError(error.code,'registro'));
  }


  onValidError(error : any, type: string){ 
    const DIALOG_ERROR = Object.entries(ERROR_FIREBASE).find(([key, value]) => value ===  error);
    let DATA_DIALOG = null;
    if(DIALOG_ERROR){
      if(DIALOG_ERROR[0] === 'en_uso') DATA_DIALOG = messageAuth.datos_existentes
      if(DIALOG_ERROR[0] === 'error_500') DATA_DIALOG = messageType.algo_salio_mal 
      if(DIALOG_ERROR[0] === 'datos_incorrectos' && type === 'login' ) messageAuth.datos_Noexistentes 
    } 
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      disableClose: false, width: '350px', data: DATA_DIALOG 
    }); 
    dialogRef.afterClosed().subscribe((resp: boolean) => { 
       let ruta = ( type === 'login' ? '/auth/registro' : '/auth' )
       this.router.navigateByUrl(ruta);
    }); 
  }

 
  get isAuthentication(): boolean{
    const USERLOCAL = localStorage.getItem("user"); 
    // Check if the user data exists in local storage
    if (USERLOCAL) {
      const USER = JSON.parse(USERLOCAL);   
      if (USER !== null) return true;
    }
    return false;
  }

  logout(){
    return this.fireauthsrv.signOut()
    .then(() => {
      localStorage.removeItem("user");
      this.router.navigateByUrl('/auth');
    });
   }

}
