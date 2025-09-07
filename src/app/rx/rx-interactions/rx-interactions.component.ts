import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rx-interactions',
  templateUrl: './rx-interactions.component.html',
  styleUrls: ['./rx-interactions.component.scss']
})
export class RxInteractionsComponent {
  rxcui = '341248';
  rows: {name:string; severity:string; description:string}[] = [];
  msg='';

  constructor(private http: HttpClient){}

  load(){
    this.msg=''; this.rows=[];
    const url = `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${this.rxcui}`;
    this.http.get<any>(url).subscribe({
      next: data => {
        const pairs = data?.interactionTypeGroup?.[0]?.interactionType?.[0]?.interactionPair || [];
        this.rows = pairs.map((p:any) => ({
          name: p.interactionConcept?.map((c:any)=>c.sourceConceptItem?.name).join(' + ') || '',
          severity: p.severity || '',
          description: p.description || ''
        }));
        if (!this.rows.length) this.msg = 'No interactions found.';
      },
      error: _ => this.msg = 'Failed to fetch RxNav data'
    });
  }
}
