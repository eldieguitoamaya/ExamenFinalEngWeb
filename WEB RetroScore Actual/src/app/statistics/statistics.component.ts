import { Component } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  statisticsForm: FormGroup;
  statistics: any[] = [];

  ngOnInit(): void {
    this.statisticsForm = this.fb.group({
      dataInici: [''],
      dataFinal: [''],
      llocEvent: [''],
      tipusEvent: ['']
    });
  }

  onSubmit(): void {
    const filters = this.statisticsForm.value;
    this.apiService.getStatistics(filters).subscribe(statistics => {
      this.statistics = statistics;
    });
  }
}

