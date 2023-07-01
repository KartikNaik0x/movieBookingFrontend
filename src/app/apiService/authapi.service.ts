import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../model/login-data';
import { SignupData } from '../model/signup-data';
import { ResetData } from '../model/reset-data';
import { ResponseData } from '../model/response-data';

@Injectable({
  providedIn: 'root',
})
export class AuthapiService {
  //authorization-microservice url
  authserviceUrl = 'http://localhost:8080/api/v1.0/auth';
  
  //authserviceUrl = 'http://18.236.37.36:8080/api/v1.0/auth';

  constructor(private http: HttpClient) { }

  loginUser(loginData: LoginData) {
    return this.http.post<any>(this.authserviceUrl + '/login', loginData);
  }

  registerUser(signupData: SignupData) {
    return this.http.post<any>(this.authserviceUrl + "/signup", signupData);
  }

  resetPasswordUser(resetData:ResetData){
    console.log("resetttt",resetData)
    return this.http.patch<any>(this.authserviceUrl+"/forgot/${resetData.username}/updatepassword",resetData);
  }

  getUsersList(){
    return this.http.get<ResponseData[]>(this.authserviceUrl+"/getusers");
  }

  isUerLoggedIn(){
    return localStorage.getItem('accessToken')!==null;
  }
  isRoleAdmin(){
    const userRole =  localStorage.getItem('role');
    return userRole==='admin';
  }
  isRoleCustomer(){
    const userRole = localStorage.getItem('role');
    return userRole === 'customer';
  }
  getCurrentUserRoles(){
    const userRole = localStorage.getItem('role');
    if (userRole) {
      return userRole;
    }
    return '';
  }
  hasAnyRole(allowedRoles: string[]): boolean {
    const userRole = this.getCurrentUserRoles();
    return allowedRoles.includes(userRole);
  }

  logoutUser(){
    localStorage.clear();
  }

  getUserToken(){
    const token =  localStorage.getItem('accessToken');
    const finalToken = 'Bearer '+token;
    return finalToken;
  }

  getUsername(){
    const username = localStorage.getItem('username')
    return username;
  }
  
}