import { Injectable } from '@angular/core'; 
 
import { environment } from '../../environments/environment.prod';
 

@Injectable({
  providedIn: 'root'
})
export class EncrdecrService {

  secretKeyAES = environment.secretKeyAES;
  secretIv = environment.secretIv;

  constructor() { }


  set(value: string, keys: string) {
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys); 
    const encrypted = CryptoJS.AES.encrypt( 
      value, key,
      {
        keySize: 16,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();

  }


  get(value :string, keys :string) {
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);

    const decrypted = CryptoJS.AES.decrypt(
      value, key, {
      keySize: 16,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }
 
  setSha(password : string){
    const iv16Bits = CryptoJS.enc.Utf8.parse(this.secretIv);  
    const key = CryptoJS.enc.Utf8.parse(this.secretKeyAES);
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv16Bits,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    return encrypted;
  }

}
