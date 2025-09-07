import { Component, OnInit } from '@angular/core';
import { PrescriptionService, PrescriptionDTO } from '../prescription.service';
import { Router } from '@angular/router';

function currentMonthRange(){
  const now = new Date();
  const s = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0,10);
  const e = new Date(now.getFullYear(), now.getMonth()+1, 0).toISOString().slice(0,10);
  return {start:s, end:e};
}

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {
  items: PrescriptionDTO[] = [];
  page=0; size=10; count?: number;
  startDate=''; endDate=''; loaded=false; msg='';

  constructor(private api: PrescriptionService, private router: Router){}

  ngOnInit(){
    const r = currentMonthRange();
    this.startDate = r.start; this.endDate = r.end;
    this.load();
  }

  load(){
    this.msg='';
    this.api.list(this.startDate, this.endDate, this.page, this.size).subscribe({
      next: res => { this.items = res.obj || []; this.count = res.count; this.loaded = true; },
      error: err => { this.msg = err?.error?.message || 'Failed to load'; this.loaded = true; }
    });
  }

  create(){ this.router.navigate(['/prescriptions/create']); }
  edit(id:number){ this.router.navigate(['/prescriptions', id, 'edit']); }

  remove(id:number){
    if (!confirm(`Delete #${id}?`)) return;
    this.api.delete(id).subscribe({
      next: _ => this.load(),
      error: err => this.msg = err?.error?.message || 'Delete failed'
    });
  }
}
