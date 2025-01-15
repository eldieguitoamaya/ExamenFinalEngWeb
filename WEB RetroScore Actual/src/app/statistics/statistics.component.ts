import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Statistics } from '../models/Statistics';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  statisticsForm: FormGroup;
  statistics: Statistics[] = [];

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
    this.apiService.getLastStatistics(filters).subscribe(statistics => {
      this.statistics = statistics;
    });
  }
}