import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'highcharts';
import { ApiServiceService } from '../services/api-service.service';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


//for edit component
export class EditComponent implements OnInit {

//two way binding from employye ts
  Employee:EmployeeModel={}

  //DEPENEDENCY INJECTION
  //activatedroute use to acess id from url
  //private api for api call
  //router for navigate when edit finished
  constructor(private route:ActivatedRoute,private api:ApiServiceService,private router:Router){}

//pageload avumbo varrn fst implement oninit,params is parameter, call back is we have sure in subscribe the result is come  so given as res
  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      // console.log(res);
       
      //destructring id
      const {id}=res
      console.log(id);

      this.getexistingUser(id)
      
    })
    //create api in api service

  }
  //taking from api before this ,private api il apiservice kodukanam ,dependency injection
  getexistingUser(id:any){
    this.api.getAEmplooyeApi(id).subscribe({

      next:(res:any)=>{
        console.log(res);
          //taking emploee from two way binding in to res
        this.Employee=res
      },

      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

//updating user when it going editing ,,take from api
  UpdateEmployee(id:any){
    this.api.updateEmployeeDetailsApi(id,this.Employee).subscribe({
      next:(res:any)=>{
        console.log(res); 
        alert('Employee Details Updated Successfully') 
        //router give for navigate to users
        //router koduth kazhijit
        this.router.navigateByUrl('employee')
      },
      error:(err:any)=>{
        console.log(err);
        
      }
      
    })

  }
  //to reload old content when cancel button click

  cancelEdit(id:any){
    this.getexistingUser(id)
  }

}
