import { GlobalDataSummary } from './../../models/data-models';
import { DataServiceService } from './../../service/data-service.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  caseActive = 0;
  caseDeaths = 0;
  caseRecovered = 0;
  caseConfirmed = 0;
  globalData: GlobalDataSummary[];
  dataTable: any [] = [];
  chart ={
     PieChart: 'PieChart',
     ColumnChart: 'ColumnChart',
     LineChart: 'LineChart',
     height: 500,
     options: {

      is3D: true,

       animation: {
         duration: 1000,
         easing: 'out'
       }
     }

  }
  constructor(private dataService: DataServiceService) { }
  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe({
      next: (results) => {
        this.globalData = results;
        results.forEach(cs =>
          {
            if (!Number.isNaN(cs.confirmed))
            {
              this.caseActive +=  cs.active;
              this.caseConfirmed += cs.confirmed;
              this.caseDeaths += cs.deaths;
              this.caseRecovered += cs.recovered;
            }
          });
        this.initChart('c');
      } } );
 }
 updateValue(input: HTMLInputElement)
  {
    console.log(input.value);
    this.initChart(input.value);
  }
  initChart(caseType: string){
    // this.dataTable.push(['Countries', 'Cases']);
    this.dataTable = [];
    this.globalData.forEach(cs => {

      if (caseType === 'a')
      {
        if (cs.active > 1000)
        {this.dataTable.push([
          cs.country, cs.active
                    ]); }
      }
      if (caseType === 'r')
      {
        if (cs.recovered > 2000)
        { this.dataTable.push([
          cs.country, cs.recovered
                    ]); }
      }
      if (caseType === 'd')
      {
        if (cs.deaths > 2000)
        { this.dataTable.push([
          cs.country, cs.deaths
                    ]); }
      }
      if (caseType === 'c')
      {
        if (cs.confirmed > 50000)
          { this.dataTable.push([
            cs.country, cs.confirmed
                      ]); }
      }

      });
    console.log(this.dataTable);

}


}
