import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface CarouselSlide {
  id: string;
  /** Text shown before the highlighted span. If no highlight, this is the full title. */
  title: string;
  /** Text rendered inside a <span> after the title (accent color). Empty string = no span. */
  titleHighlight: string;
  body: string;
  ctaLabel: string;
  ctaLink: string;
}

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  protected readonly slides = signal<CarouselSlide[]>([
    {
      id: 'slide-1',
      title: 'Bienvenue sur',
      titleHighlight: 'le portail de UTGL solutions',
      body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
      ctaLabel: 'En savoir plus',
      ctaLink: '#services',
    },
    {
      id: 'slide-2',
      title: 'Lorem Ipsum Dolor',
      titleHighlight: '',
      body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
      ctaLabel: 'En savoir plus',
      ctaLink: '#services',
    },
    {
      id: 'slide-3',
      title: 'Sequi ea ut et est quaerat',
      titleHighlight: '',
      body: 'Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.',
      ctaLabel: 'En savoir plus',
      ctaLink: '#services',
    },
  ]);
}
