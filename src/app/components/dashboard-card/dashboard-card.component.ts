import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

   @Input('caseDeaths') caseDeaths;
   @Input('caseRecovered') caseRecovered;
   @Input('caseActive') caseActive;
   @Input('caseConfirmed') caseConfirmed

  constructor() { }

  ngOnInit(): void {
  }

}
