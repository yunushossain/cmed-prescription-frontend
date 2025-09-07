import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrescriptionService, PrescriptionDTO } from '../prescription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.scss']
})
export class PrescriptionFormComponent implements OnInit {
  isEdit=false; id?: number; submitted=false; loading=false; msg='';

  form = this.fb.group({
    prescriptionDate: ['', Validators.required],
    patientName: ['', Validators.required],
    patientAge: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
    patientGender: ['', Validators.required],
    diagnosis: [''],
    medicines: [''],
    nextVisitDate: ['']
  });

  constructor(private fb: FormBuilder, private api: PrescriptionService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    const pid = this.route.snapshot.paramMap.get('id');
    if (pid){ this.isEdit = true; this.id = +pid;
      this.api.getById(this.id).subscribe({
        next: res => this.form.patchValue(res.obj as any),
        error: err => this.msg = err?.error?.message || 'Load failed'
      });
    } else {
      this.form.patchValue({ prescriptionDate: new Date().toISOString().slice(0,10) });
    }
  }

  submit(){
    this.submitted = true; this.msg='';
    if (this.form.invalid) return;
    const dto = this.form.value as unknown as PrescriptionDTO;
    this.loading = true;
    const call = this.isEdit ? this.api.update(this.id!, dto) : this.api.create(dto);
    call.subscribe({
      next: _ => this.router.navigate(['/prescriptions']),
      error: err => { this.msg = err?.error?.message || 'Save failed'; this.loading=false; }
    });
  }

  cancel(){ this.router.navigate(['/prescriptions']); }
}
