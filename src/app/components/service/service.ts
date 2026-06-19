import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Service {}
