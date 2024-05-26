import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  serverUrl='https://employeeportalserver-taq1.onrender.com'

  constructor(private http:HttpClient) { }
//login api
  loginApi(){ //it return observable.
    return this.http.get(`${this.serverUrl}/Employees/1`)
  }
//api to add employee
addEmployeeApi(employee:EmployeeModel){
  return this.http.post(`${this.serverUrl}/Employees`,employee)
}

//api to get all employee

getAllEmployeeApi(){
  return this.http.get(`${this.serverUrl}/Employees`)
}

//api to delete all employye

deleteEmployeeApi(id:any){
  return this.http.delete(`${this.serverUrl}/Employees/${id}`)
}

//api to delete a particular api last call this emplooye

getAEmplooyeApi(id:any){
  return this.http.get(`${this.serverUrl}/Employees/${id}`

  )
}

//api to update particyular employee

updateEmployeeDetailsApi(id:any,body:any){
  return this.http.put(`${this.serverUrl}/Employees/${id}`,body)
  //then go edit ts
}

//api to update admin details,emplooyes/1 for athill an admin id

updateAdminApi(body:any){
return  this.http.put(`${this.serverUrl}/Employees/1`,body)
//then go home ts
}
  
}
