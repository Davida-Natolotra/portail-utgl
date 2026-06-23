import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import type { ServiceItem, ServiceSectionMeta } from '../../shared/firebase-models';

export type { ServiceItem, ServiceSectionMeta };

const defaultMeta: ServiceSectionMeta = {
  title: 'Solutions UTGL',
  subtitle: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
};

const defaultServices: ServiceItem[] = [
  {
    id: 'service-1',
    icon: 'bi-activity',
    title: 'GAS FS',
    description: 'Solution de rapport des utilisations au niveaux formation sanitaire et CSB',
    link: '#',
    downloadUrl: '#',
    downloadLabel: 'Télécharger',
    downloadStoragePath: '',
    order: 0,
  },
  {
    id: 'service-2',
    icon: 'bi-broadcast',
    title: 'GAS DISTRICT',
    description: "Solution digital sur les rapports d'utilisations des CSB et Pha-G-Dis.",
    link: '#',
    downloadUrl: '#',
    downloadLabel: 'Télécharger',
    downloadStoragePath: '',
    order: 1,
  },
  {
    id: 'service-3',
    icon: 'bi-easel',
    title: 'GAS Pha-G-Dis',
    description: 'Solution de rapport des utilisations au niveaux des Pha-G-Dis.',
    link: '#',
    downloadUrl: '#',
    downloadLabel: 'Télécharger',
    downloadStoragePath: '',
    order: 2,
  },
];

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.html',
  styleUrl: './service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Service {
  private readonly firebase = inject(FirebaseService);
  protected readonly meta = signal<ServiceSectionMeta>(defaultMeta);
  protected readonly services = signal<ServiceItem[]>(defaultServices);

  constructor() {
    this.loadServices();
  }

  private async loadServices(): Promise<void> {
    try {
      const [meta, items] = await Promise.all([
        this.firebase.getServiceMeta(),
        this.firebase.getServiceItems(),
      ]);
      if (meta) this.meta.set(meta);
      if (items.length) this.services.set(items);
    } catch (err) {
      console.error('Unable to load services from Firebase', err);
    }
  }
}
