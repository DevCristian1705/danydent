import { Injectable } from '@angular/core'; 
import * as CryptoJS from 'crypto-js';
import { STORAGE_KEY } from '../../constants/storage'; 
import { environment } from '../../../environments/environment.prod';
import { IUser } from '../../../shared/interfaces/user.interface';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  

  setData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  getData(key: string): string | null { 
    let data = localStorage.getItem(key);
    if (data) {
      return this.decrypt(data)
    } else { 
      return null;
    } 
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  listUsuarios(){
    const users : any = this.getData(STORAGE_KEY.listUser)
    const listUserRegistrados : IUser[] = JSON.parse(users) || []; 
    return listUserRegistrados || null
  }

  setSessionUser(data: IUser) { 
    this.setData(STORAGE_KEY.sessionUser, JSON.stringify(data));
  }

  getSessionUser() {
    return this.getData(STORAGE_KEY.sessionUser) || null;
  }

  clearData(): void {
    localStorage.clear();
  }
  
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.keyencrypt).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.keyencrypt).toString(CryptoJS.enc.Utf8);
  }


  get isAuthenticated() {
    const datosSession: any = this.getSessionUser();
    const user = datosSession ? JSON.parse(datosSession) : null;
    return user;
  }

}
