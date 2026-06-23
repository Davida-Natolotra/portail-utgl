import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import type { CarouselSlide } from '../../shared/firebase-models';

const defaultSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'Bienvenue sur',
    titleHighlight: 'le portail de UTGL solutions',
    body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
    ctaLabel: 'En savoir plus',
    ctaLink: '#services',
    order: 0,
  },
  {
    id: 'slide-2',
    title: 'Lorem Ipsum Dolor',
    titleHighlight: '',
    body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
    ctaLabel: 'En savoir plus',
    ctaLink: '#services',
    order: 1,
  },
  {
    id: 'slide-3',
    title: 'Sequi ea ut et est quaerat',
    titleHighlight: '',
    body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
    ctaLabel: 'En savoir plus',
    ctaLink: '#services',
    order: 2,
  },
];

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  private readonly firebase = inject(FirebaseService);
  protected readonly slides = signal<CarouselSlide[]>(defaultSlides);

  constructor() {
    this.loadSlides();
  }

  private async loadSlides(): Promise<void> {
    try {
      const slides = await this.firebase.getCarouselSlides();
      if (slides.length) this.slides.set(slides);
    } catch (err) {
      console.error('Unable to load carousel slides from Firebase', err);
    }
  }
}
