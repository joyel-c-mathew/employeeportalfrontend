import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {



  //transform function will convert the input data into a new formate/data
    //first argument - data to be transformed
      //sec argumnt - based on which this transformation has to be done , taking from emplyee ts
  transform(allEmployee:any[],searchKey:string): any[] {
    const result:any=[]

//if nothing is present
    if(!allEmployee || searchKey==""){
      return allEmployee
    }
    //if there is data
    allEmployee.forEach((item:any)=>{
      if(item.username.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        //adding to result array
        result.push(item)
      }
    })
    return result
    
  }

}
