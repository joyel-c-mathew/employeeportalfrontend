import { Component } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import Swal from 'sweetalert2';
import { error } from 'highcharts';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  emplooye:EmployeeModel={}

  //caling api after api service adding emplooyes
  constructor(private api:ApiServiceService, private router:Router){}


  //function to delete details enterd in the filed
  cancelEmployee(){
    this.emplooye={}
  }

//to save or adding employee
addEmployee(){
  console.log(this.emplooye);
  this.api.addEmployeeApi(this.emplooye).subscribe({
    next:(res:EmployeeModel)=>{
      console.log(res);
      Swal.fire({
        title:'wow',
        text:`${this.emplooye.username} added successfully`,
        icon:'success'
      })
      this.router.navigateByUrl('employee')
      
    },
    error:(res:any)=>{
      console.log(res);
      
    }


  })
  

}
}
