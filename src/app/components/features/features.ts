import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [NgOptimizedImage],
  templateUrl: './features.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features {}
