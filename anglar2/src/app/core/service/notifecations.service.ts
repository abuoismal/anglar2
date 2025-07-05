import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Service to display notification messages using PrimeNG's MessageService.
 */
@Injectable({
  providedIn: 'root',
})
export class NotifecationsService {
  constructor(private _messageService: MessageService) {}

  /**
   * Show a success notification.
   * @param summary Short summary of the message.
   * @param detail Detailed message.
   */
  showSuccess(summary: string, detail: string): void {
    this._messageService.add({
      severity: 'success',
      summary,
      detail,
    });
  }

  /**
   * Show an info notification.
   * @param summary Short summary of the message.
   * @param detail Detailed message.
   */
  showInfo(summary: string, detail: string): void {
    this._messageService.add({
      severity: 'info',
      summary,
      detail,
    });
  }

  /**
   * Show a warning notification.
   * @param summary Short summary of the message.
   * @param detail Detailed message.
   */
  showWarn(summary: string, detail: string): void {
    this._messageService.add({
      severity: 'warn',
      summary,
      detail,
    });
  }

  /**
   * Show an error notification.
   * @param summary Short summary of the message.
   * @param detail Detailed message.
   */
  showError(summary: string, detail: string): void {
    this._messageService.add({
      severity: 'error',
      summary,
      detail,
    });
  }
}
