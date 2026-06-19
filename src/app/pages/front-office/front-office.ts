import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { Cta } from '../../components/cta/cta';
import { Footer } from '../../components/footer/footer';
import { Service } from '../../components/service/service';
import { Toolbar } from '../../components/toolbar/toolbar';

@Component({
  selector: 'app-front-office',
  imports: [Toolbar, Carousel, Service, Cta, Footer],
  templateUrl: './front-office.html',
  styleUrl: './front-office.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontOffice {}
