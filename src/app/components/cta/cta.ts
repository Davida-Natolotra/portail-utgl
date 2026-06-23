import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import type { CtaContent } from '../../shared/firebase-models';

export type { CtaContent };

const defaultCta: CtaContent = {
  backgroundImageUrl: 'assets/img/cta-bg.jpg',
  backgroundImageWidth: 1920,
  backgroundImageHeight: 1080,
  backgroundStoragePath: '',
  title: 'Configuration de votre solution UTGL',
  description:
    "Téléchargez le fichier de configuration pour votre solution UTGL et commencez à l'utiliser dès aujourd'hui. Notre équipe est là pour vous aider à chaque étape du processus.",
  buttonLabel: 'Télécharger la configuration',
  buttonLink: '#',
  downloadStoragePath: '',
};

@Component({
  selector: 'app-cta',
  imports: [NgOptimizedImage],
  templateUrl: './cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {
  private readonly firebase = inject(FirebaseService);
  protected readonly content = signal<CtaContent>(defaultCta);

  constructor() {
    this.loadCtaContent();
  }

  private async loadCtaContent(): Promise<void> {
    try {
      const cta = await this.firebase.getCtaContent();
      if (cta) this.content.set(cta);
    } catch (err) {
      console.error('Unable to load CTA content from Firebase', err);
    }
  }
}
