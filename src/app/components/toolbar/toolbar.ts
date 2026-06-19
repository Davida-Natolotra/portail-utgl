import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  imports: [NgOptimizedImage],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {
  private readonly document = inject(DOCUMENT);
  protected readonly mobileNavActive = signal(false);

  toggleMobileNav(): void {
    const next = !this.mobileNavActive();
    this.mobileNavActive.set(next);
    this.document.body.classList.toggle('mobile-nav-active', next);
  }

  closeMobileNavIfActive(): void {
    if (this.mobileNavActive()) {
      this.mobileNavActive.set(false);
      this.document.body.classList.remove('mobile-nav-active');
    }
  }
}
