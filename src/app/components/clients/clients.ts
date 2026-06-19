import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  imports: [NgOptimizedImage],
  templateUrl: './clients.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clients {}
