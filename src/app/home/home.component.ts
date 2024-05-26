import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected: Date | null = new Date()

  //for image in button click for edit button
  showAdminDetils:boolean = false;
  AdminDetils:any = {}

//property binding nu vendi for imge
  profileImg:string='https://th.bing.com/th/id/R.560b77742fd3492c31dfad7585520e4f?rik=nung3x96FkVtaA&riu=http%3a%2f%2fwww.ssrl-uark.com%2fwp-content%2fuploads%2f2014%2f06%2fno-profile-image-300x300.png&ehk=m0iohIGM7l8%2fc4jW4OHn1ldB5FS52Pn4kJvDk9dgh8o%3d&risl=&pid=ImgRaw&r=0'

  //for sidebar
  showSideBar:boolean=true

//creating varible for employee count after ngonint stp then call this on getallemployee ts
  employeeCount:number=0

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions= {}
  constructor(private api:ApiServiceService){
    this.chartOptions={    chart: {
      //type of charts
      type: 'pie'
  },
  title: {
      text: 'Project Completion Report'
  },
  tooltip: {
      valueSuffix: '%'
  },
credits:{
  enabled:false
},
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  series: [
      {
          name: 'Percentage',
          colorByPoint: true,
          data: [
              {
                  name: 'chrome',
                  y: 55.02
              },
              {
                  name: 'firefox',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'safari',
                  y: 1.09
              },
              {
                  name: 'edge',
                  y: 15.5
              },
              {
                  name: 'opera',
                  y: 1.68
              }
          ]
      }
  ]
}
HC_exporting(Highcharts);

//function to get admin details when edit button click this taking from adiill ullath same this calling on cancel button
this.getAdminDetails()


}

//after getallemployye count ts .. page load avumboo varan before implements oninint,then aftr this go getallemployye count ts
ngOnInit(): void {
    this.getAllEmploye()
}


//funnction for get admin details again when click cancel button and also ee same snam edit buton click akkumbo call akunu in upside
getAdminDetails(){
 this.api.loginApi().subscribe({
    next:(res:any)=>{
        console.log(res);
        this.AdminDetils=res
//for picture
        if(res.picture){
            this.profileImg = res.picture
        }
        

    },
    error:(err:any)=>{
        console.log(err);
        
    }
})
}

// for reload nd come edit admins content wgen button click


//for save button
toggleAdminDetails(){
    this.showAdminDetils = true
}


//for cancel button
cancel(){
    // clicking cancel button namak munne undarnna content pazhaya polle kittan
    this.getAdminDetails()
    this.showAdminDetils = false
}


//for image taking from our system

getfile(event:any){
    //storing in varaible
    let file = event.target.files[0]
    console.log(file);

    
   
//to covert  to url to fileReader()

  //1)create object foe class
    let fr = new FileReader()

       //convert file to url
    fr.readAsDataURL (file)

   //access using onload function
    fr.onload=(event:any)=>{
        console.log(event.target.result);

        //then storing cheytha url edukunnu from upside => profileImg
        this.profileImg = event.target.result
        //this picture also giving to admindetails section
        this.AdminDetils.picture = event.target.result
        
    }



    
}

//to update admin after stp creating api

updateAdmin(){
//body ayii admindetails koduthu
    this.api.updateAdminApi(this.AdminDetils).subscribe({

        next:(res:any)=>{
            Swal.fire({
                title:'wow',
                text:'Updated successfully',
                icon:'success'

            })
            
           
            console.log(res);
// admin details ilek res eduth vekkunu
            this.AdminDetils = res
//for going  edit admin home page aftr click update button 
            this.showAdminDetils=false

            if(res.picture){
                this.profileImg=res.picture
            }

            
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
}

//function to handel sidebar
handelsidebar(){
    this.showSideBar=!this.showSideBar

}


//function to display employe count number
getAllEmploye(){
    this.api.getAllEmployeeApi().subscribe({
        next:(res:any)=>{console.log(res);
            //string interpoltion then this call in employye html
            this.employeeCount = res.length

        },
        error:(err:any)=>{
            console.log(err);
        }
    })

}
  }
