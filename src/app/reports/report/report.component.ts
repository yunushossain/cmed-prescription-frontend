import { Component, OnInit } from '@angular/core';
import { ReportService, DayWiseReportDTO } from '../report.service';
import { ChartConfiguration } from 'chart.js';

function currentMonthRange(){
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0,10),
    end: new Date(now.getFullYear(), now.getMonth()+1, 0).toISOString().slice(0,10)
  };
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  startDate=''; endDate=''; data: DayWiseReportDTO[] = [];
  chartData: ChartConfiguration['data'] = { labels: [], datasets: [{ data: [], label: 'Count' }] };

  constructor(private api: ReportService){}

  ngOnInit(){ const r = currentMonthRange(); this.startDate=r.start; this.endDate=r.end; this.load(); }

  load(){
    this.api.dayCount(this.startDate, this.endDate).subscribe(res => {
      this.data = res;
      this.chartData = {
        labels: res.map(d => d.day),
        datasets: [{ data: res.map(d => d.count), label: 'Count' }]
      };
    });
  }
}
