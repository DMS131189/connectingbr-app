import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    if (email== "deyse@test.com" && password=="123456"){
      return true;
    } 
    return false;
  }


}


