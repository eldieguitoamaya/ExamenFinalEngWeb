import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  private apiService = inject(ApiService);
  events: any[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.apiService.getLastStatistics().subscribe(events => {
      this.events = events;
    });
  }
}
