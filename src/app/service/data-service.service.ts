import { GlobalDataSummary } from './../models/data-models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-14-2020.csv';

  constructor(private http: HttpClient) { }

  getGlobalData()
  {
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result => {
       console.log(result);
       const data: GlobalDataSummary[] = [];
       const raw = {};
       const rows = result.split('\n');
       rows.splice(0, 1);
       rows.forEach(row =>
          {
            const cols = row.split(/,(?=\S)/);
            // console.log(cols);
            const cs = {
              country : cols[3],
              confirmed : +cols[7],
              recovered : +cols[9],
              deaths : +cols[8],
              active : +cols[10],
            };
            const temp: GlobalDataSummary = raw[cs.country];
            if (temp)
            {
              temp.active = cs.active + temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths + temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;

              raw[cs.country] = temp;
            }else
            {
              raw[cs.country] = cs;
            }

          });
       return <GlobalDataSummary[]> Object.values(raw);
      })
    );
  }
}
