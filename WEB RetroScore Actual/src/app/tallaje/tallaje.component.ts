import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../Services/api.service';
import { SessionService } from '../Services/session.service';

@Component({
  selector: 'app-tallaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tallaje.component.html',
  styleUrls: ['./tallaje.component.css']
})
export class TallajeComponent implements OnInit {
  private titleService = inject(Title);
  private apiService = inject(ApiService);
  private sessionService = inject(SessionService);

  showFAQ: boolean = false;

  ngOnInit(): void {
    this.titleService.setTitle('RetroScore | Tallaje');
    this.createVisitRecord();
  }

  private createVisitRecord(): void {
    const sessionId = this.sessionService.getSessionId();
    const userId = this.apiService.getLoggedInUser()?._id || null;
    const llocEvent = 'Tallaje';
    const tipusEvent = 'visita';

    this.apiService.createStatistic({ sessionId, userId, llocEvent, tipusEvent }).subscribe();
  }

  toggleFAQ(): void {
    this.showFAQ = !this.showFAQ;
  }

}