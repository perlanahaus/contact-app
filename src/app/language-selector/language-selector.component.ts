import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  template: `
    <button mat-button [matMenuTriggerFor]="langMenu">{{ 'language' | transloco }}</button>
    <mat-menu #langMenu="matMenu">
      <button mat-menu-item (click)="setLanguage('en')">English</button>
      <button mat-menu-item (click)="setLanguage('de')">German</button>
    </mat-menu>
  `,
})
export class LanguageSelectorComponent {
  constructor(private translocoService: TranslocoService) {}

  setLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
