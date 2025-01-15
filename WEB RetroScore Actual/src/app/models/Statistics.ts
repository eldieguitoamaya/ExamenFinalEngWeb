export interface Statistics {
    _id: string;
    sessionId: string;
    userId: string | null;
    llocEvent: string;
    tipusEvent: 'visita' | 'click';
    createdAt: Date;
  }