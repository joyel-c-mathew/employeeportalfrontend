import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
//last[] arra empty akkunu
  allEmployee:EmployeeModel[]=[]

  //for date kiitan ,then call this in employ html
  adminLoginTime:any = new Date

  //for search akumbo filter aii varan ,, then ith search pipe ts il koduka
  searchKey:string=""

  //for pagination
  p: number = 1;



  //depededcy injecting before calling a function like getallemployee
constructor(private api:ApiServiceService){}
//same function like useefct page load avubo content varan also we  use this funct fst in constructor il oninit veknam,also dow in constructor
ngOnInit(): void {
  this.getAllEmployee()
//we get all datas when page relod
}

  //calling getallemployee from all api service
getAllEmployee(){
  this.api.getAllEmployeeApi().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allEmployee = res
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }

  })


}


//for sorting //id is the key
sortId(){
  this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
}

//for sorting 
//localecompare
//to compare a two string for nme sorting  return -1,1,0 ( for before ,after, equal)
//syntax
//string.localCompare(comparestring)
sortName(){
  this.allEmployee.sort((a:any,b:any)=>a.username.localeCompare(b.username))
}

//method to generate pdf

generatePdf(){

  //craete  an object for jspdf class
  const pdf = new jsPDF()

//we can give any names as heading
  let head =[['Emplooye Id','Emplooye Name','Email','Status']]

//body given as any for id name etc
  let body :any = []

//since we have data from backend and the body should be nexted array
//give item.id from all employyes and foreach for taking one object from that ,,( like map) and taking one by one item,, becoz it store like object,push for adding
  this.allEmployee.forEach(item=>{
    body.push([item.id,item.username,item.email,item.status])
  })

  //to see a font size to the table
  pdf.setFontSize(15)
  
  //giving heading
  pdf.text('Employee Details',10,10)

//generating table
  autoTable(pdf,{head,body})

  //to open this table in new tab , dataurl suggestion varum
  pdf.output('dataurlnewwindow')

  //to name of the pdf file, name is given by ourself
  pdf.save('Employeedetails.pdf')
}

// method to delete an emplooye details

deleteEmployee(id:any){
  this.api.deleteEmployeeApi(id).subscribe({
    next:(res:any)=>{console.log(res);
      alert('Delition successfuly')
      this.getAllEmployee()
    },
    error:(err:any)=>{console.log(err);
    }
  })
}


}

