import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId(): string {
    return this.sessionId;
  }
}