import { Component } from '@angular/core';
import { RxService } from '../rx.service';

@Component({
  selector: 'app-rx-interactions',
  templateUrl: './rx-interactions.component.html',
  styleUrls: ['./rx-interactions.component.scss']
})
export class RxInteractionsComponent {
  rxcui = '341248';
  loading = false;
  error = '';
  rows: { drug: string; description: string }[] = [];

  constructor(private rx: RxService) {}

  fetch() {
    if (!this.rxcui?.trim()) {
      this.error = 'Please enter an RXCUI';
      return;
    }

    this.loading = true; this.error = ''; this.rows = [];
    this.rx.getInteractions(this.rxcui).subscribe({
      next: (data) => {
        try {
          const groups = data?.interactionTypeGroup ?? [];
          const rows: any[] = [];
          for (const g of groups) {
            for (const t of (g.interactionType ?? [])) {
              for (const p of (t.interactionPair ?? [])) {
                const drugNames = (p.interactionConcept ?? [])
                  .map((c: any) => c?.minConceptItem?.name)
                  .filter((x: any) => !!x)
                  .join(' + ');
                const desc = p?.description ?? '';
                rows.push({ drug: drugNames, description: desc });
              }
            }
          }
          this.rows = rows;
        } catch {
          this.error = 'Unexpected response format';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load interactions';
        this.loading = false;
      }
    });
  }
}
