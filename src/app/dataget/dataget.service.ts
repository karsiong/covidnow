import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatagetService {
  socket:string;
  constructor(
    public http: HttpClient
  ) {
    this.socket='https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/'
  }

//get last data in string form
  conv_latestdata(data:String){
    let list = data.split("\n");
    let listnn = list[list.length-2].split(",");
    return listnn;
  }

//spliter for each state case
  conv_statecase(data:String){
    let list = data.split("\n").reverse();
    let last16line:any[]=[];
    let eachline:any[][]=[];
    let importcase:number = 0;

    for (let i = 0; i < 16; i++) {
      last16line[i] = list[i+1];
      eachline[i]=last16line[i].split(",");
      importcase += Number(eachline[i][2]);
    }
    eachline.push(
      ["","Import case","",importcase.toString()]
    );
    console.log(importcase);

    return eachline;
  }

//get total case
  get_totalcase():Promise<String>{
    let url = this.socket+'cases_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )/*
    .catch(e=>{
      console.log("Cannot get data from sever");
    });*/
  }

  get_deadcase():Promise<String>{
    let url = this.socket+'deaths_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
  }

  get_testcon():Promise<String>{
    let url = this.socket+'tests_malaysia.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
  }

  get_statecase():Promise<String>{
    let url = this.socket+'cases_state.csv';
    let result:String[]=[];

    return this.http.get(url,{responseType:'text'})
    .toPromise()
    .then(rawdata=> rawdata as String
    )
  }


}
