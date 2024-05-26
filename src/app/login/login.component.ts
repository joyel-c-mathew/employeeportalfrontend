import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail:string=""
  loginpswd:string=""

  constructor(private api:ApiServiceService,private router:Router){}

  login(){
    if(!this.loginEmail || !this.loginpswd){
      Swal.fire({
        title:'oops',
        text:'please fill form completely',
        icon:"info"
      })
    }
    else{
      this.api.loginApi().subscribe({
        next:(res:any)=>{
          console.log(res);
          const{email,password} = res
          if(email==this.loginEmail && password==this.loginpswd){
            Swal.fire({
              title:'Wow',
              text:'login succesfully',
              icon:"success"
            })
        
            this.router.navigateByUrl('dashboard')


          }
          else{
            Swal.fire({
              title:'opps',
              text:'invalid user id password',
              icon:"error"
            })
           
          }
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }

      })
   
    }
  }

}
