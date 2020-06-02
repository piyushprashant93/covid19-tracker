import { GlobalDataSummary } from './../../models/data-models';
import { DataServiceService } from './../../service/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  dataGlobal: GlobalDataSummary[];
  countries: string[] = [];
  caseActive = 0;
  caseDeaths = 0;
  caseRecovered = 0;
  caseConfirmed = 0;

  constructor( private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      this.dataGlobal = result;
      this.dataGlobal.forEach(con =>
        {
           this.countries.push(con.country);
        });


      });
  }
  updateValue(country: string){

    this.dataGlobal.forEach(con =>{
      if (con.country === 'US')
      {
        this.caseActive = con.active;
        this.caseConfirmed = con.confirmed;
        this.caseRecovered = con.recovered;
        this.caseDeaths = con.deaths;
      }else{

      if (con.country === country)
      {
        this.caseActive = con.active;
        this.caseConfirmed = con.confirmed;
        this.caseRecovered = con.recovered;
        this.caseDeaths = con.deaths;
      }
    }
    });
  }

}
