import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

export interface ServiceItem {
  id: string;
  /** Bootstrap icon class e.g. 'bi-activity'. Stored as a string for Firebase compatibility. */
  icon: string;
  title: string;
  description: string;
  /** Internal route or external URL for the detail page. */
  link: string;
  /** Firebase Storage URL or local asset path for the downloadable config/document. */
  downloadUrl: string;
  downloadLabel: string;
}

export interface ServiceSectionMeta {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-service',
  imports: [],
  templateUrl: './service.html',
  styleUrl: './service.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Service {
  protected readonly meta = signal<ServiceSectionMeta>({
    title: 'Solutions UTGL',
    subtitle: 'Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit',
  });

  protected readonly services = signal<ServiceItem[]>([
    {
      id: 'service-1',
      icon: 'bi-activity',
      title: 'UTGL FS',
      description: 'Solution de rapport des utilisations au niveaux formation sanitaire et CSB',
      link: '/services/nesciunt-mete',
      downloadUrl: '#',
      downloadLabel: 'Télécharger',
    },
    {
      id: 'service-2',
      icon: 'bi-broadcast',
      title: 'GAS DISTRICT',
      description: "Solution digital sur les rapports d'utilisations des CSB et Pha-G-Dis.",
      link: '/services/eosle-commodi',
      downloadUrl: '#',
      downloadLabel: 'Télécharger',
    },
    {
      id: 'service-3',
      icon: 'bi-easel',
      title: 'UTGL Pha-G-Dis',
      description: 'Solution de rapport des utilisations au niveaux des Pha-G-Dis.',
      link: '/services/ledo-markt',
      downloadUrl: '#',
      downloadLabel: 'Télécharger',
    },
  ]);
}
