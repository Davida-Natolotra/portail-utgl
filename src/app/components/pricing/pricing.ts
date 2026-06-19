import { ChangeDetectionStrategy, Component } from '@angular/core';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  icon: string;
  price: number;
  featured: boolean;
  features: PricingFeature[];
}

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  protected readonly plans: PricingPlan[] = [
    {
      name: 'Free Plan',
      icon: 'bi-box',
      price: 0,
      featured: false,
      features: [
        { text: 'Quam adipiscing vitae proin', included: true },
        { text: 'Nec feugiat nisl pretium', included: true },
        { text: 'Nulla at volutpat diam uteera', included: true },
        { text: 'Pharetra massa massa ultricies', included: false },
        { text: 'Massa ultricies mi quis hendrerit', included: false },
      ],
    },
    {
      name: 'Business Plan',
      icon: 'bi-rocket',
      price: 29,
      featured: true,
      features: [
        { text: 'Quam adipiscing vitae proin', included: true },
        { text: 'Nec feugiat nisl pretium', included: true },
        { text: 'Nulla at volutpat diam uteera', included: true },
        { text: 'Pharetra massa massa ultricies', included: true },
        { text: 'Massa ultricies mi quis hendrerit', included: true },
      ],
    },
    {
      name: 'Developer Plan',
      icon: 'bi-send',
      price: 49,
      featured: false,
      features: [
        { text: 'Quam adipiscing vitae proin', included: true },
        { text: 'Nec feugiat nisl pretium', included: true },
        { text: 'Nulla at volutpat diam uteera', included: true },
        { text: 'Pharetra massa massa ultricies', included: true },
        { text: 'Massa ultricies mi quis hendrerit', included: true },
      ],
    },
  ];
}
