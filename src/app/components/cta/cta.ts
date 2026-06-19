import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  imports: [NgOptimizedImage],
  templateUrl: './cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cta {}
