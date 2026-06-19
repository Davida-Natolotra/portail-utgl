import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq {
  protected readonly activeIndex = signal<number | null>(0);

  protected readonly items: FaqItem[] = [
    {
      question: 'Non consectetur a erat nam at lectus urna duis?',
      answer: 'Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.',
    },
    {
      question: 'Feugiat scelerisque varius morbi enim nunc faucibus?',
      answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.',
    },
    {
      question: 'Dolor sit amet consectetur adipiscing elit pellentesque?',
      answer: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis.',
    },
    {
      question: 'Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?',
      answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.',
    },
    {
      question: 'Tempus quam pellentesque nec nam aliquam sem et tortor?',
      answer: 'Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.',
    },
    {
      question: 'Perspiciatis quod quo quos nulla quo illum ullam?',
      answer: 'Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et.',
    },
  ];

  protected toggle(index: number): void {
    this.activeIndex.update(i => (i === index ? null : index));
  }
}
