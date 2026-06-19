import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface CtaContent {
  /** Asset path or Firebase Storage URL for the background image. */
  backgroundImageUrl: string;
  backgroundImageWidth: number;
  backgroundImageHeight: number;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

@Component({
  selector: 'app-cta',
  imports: [NgOptimizedImage],
  templateUrl: './cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {
  protected readonly content = signal<CtaContent>({
    backgroundImageUrl: 'assets/img/cta-bg.jpg',
    backgroundImageWidth: 1920,
    backgroundImageHeight: 1080,
    title: 'Configuration de votre solution UTGL',
    description:
      "Téléchargez le fichier de configuration pour votre solution UTGL et commencez à l'utiliser dès aujourd'hui. Notre équipe est là pour vous aider à chaque étape du processus.",
    buttonLabel: 'Télécharger la configuration',
    buttonLink: '#',
  });
}
