import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import type { CarouselSlide, CtaContent, ServiceItem, ServiceSectionMeta } from '../../shared/firebase-models';

type AdminTab = 'carousel' | 'services' | 'cta';

const DEFAULT_CTA: CtaContent = {
  backgroundImageUrl: 'assets/img/cta-bg.jpg',
  backgroundImageWidth: 1920,
  backgroundImageHeight: 1080,
  backgroundStoragePath: '',
  title: 'Configuration de votre solution UTGL',
  description: "Téléchargez le fichier de configuration pour votre solution UTGL.",
  buttonLabel: 'Télécharger la configuration',
  buttonLink: '#',
  downloadStoragePath: '',
};

@Component({
  selector: 'app-back-office',
  imports: [ReactiveFormsModule],
  templateUrl: './back-office.html',
  styleUrl: './back-office.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackOffice {
  private readonly fb = inject(FormBuilder);
  private readonly firebase = inject(FirebaseService);

  protected readonly activeTab = signal<AdminTab>('carousel');
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly errorMsg = signal('');
  protected readonly successMsg = signal('');

  // ── CAROUSEL ──────────────────────────────────────────────────────────────
  protected readonly slides = signal<CarouselSlide[]>([]);
  protected readonly editingSlide = signal<CarouselSlide | null>(null);
  protected readonly slideForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    titleHighlight: [''],
    body: ['', Validators.required],
    ctaLabel: ['En savoir plus', Validators.required],
    ctaLink: ['#services', Validators.required],
    order: [0, Validators.required],
  });

  // ── SERVICES ──────────────────────────────────────────────────────────────
  protected readonly serviceMeta = signal<ServiceSectionMeta>({ title: 'Solutions UTGL', subtitle: '' });
  protected readonly serviceItems = signal<ServiceItem[]>([]);
  protected readonly editingService = signal<ServiceItem | null>(null);
  protected readonly serviceFile = signal<File | null>(null);
  protected readonly serviceMetaForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    subtitle: [''],
  });
  protected readonly serviceForm = this.fb.nonNullable.group({
    icon: ['bi-activity', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    link: ['#'],
    downloadLabel: ['Télécharger', Validators.required],
    order: [0, Validators.required],
  });

  // ── CTA ───────────────────────────────────────────────────────────────────
  protected readonly ctaContent = signal<CtaContent>(DEFAULT_CTA);
  protected readonly ctaBgFile = signal<File | null>(null);
  protected readonly ctaDownloadFile = signal<File | null>(null);
  protected readonly ctaForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    buttonLabel: ['', Validators.required],
  });

  constructor() {
    this.loadAll();
  }

  private async loadAll(): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set('');
    try {
      const [slides, meta, items, cta] = await Promise.all([
        this.firebase.getCarouselSlides(),
        this.firebase.getServiceMeta(),
        this.firebase.getServiceItems(),
        this.firebase.getCtaContent(),
      ]);
      this.slides.set(slides);
      if (meta) {
        this.serviceMeta.set(meta);
        this.serviceMetaForm.patchValue(meta);
      }
      this.serviceItems.set(items);
      const ctaData = cta ?? DEFAULT_CTA;
      this.ctaContent.set(ctaData);
      this.ctaForm.patchValue(ctaData);
    } catch (err) {
      this.errorMsg.set('Erreur lors du chargement des données Firebase.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  private flash(msg: string): void {
    this.successMsg.set(msg);
    setTimeout(() => this.successMsg.set(''), 3000);
  }

  // ── CAROUSEL CRUD ─────────────────────────────────────────────────────────

  protected startEditSlide(slide: CarouselSlide | null): void {
    const blank: CarouselSlide = {
      id: '', title: '', titleHighlight: '', body: '',
      ctaLabel: 'En savoir plus', ctaLink: '#services', order: this.slides().length,
    };
    this.editingSlide.set(slide ?? blank);
    this.slideForm.patchValue(slide ?? blank);
    this.errorMsg.set('');
  }

  protected cancelSlide(): void {
    this.editingSlide.set(null);
    this.slideForm.reset({ ctaLabel: 'En savoir plus', ctaLink: '#services', order: 0 });
  }

  protected async saveSlide(): Promise<void> {
    if (this.slideForm.invalid) { this.slideForm.markAllAsTouched(); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    try {
      const v = this.slideForm.getRawValue();
      const existingId = this.editingSlide()?.id || undefined;
      const savedId = await this.firebase.saveCarouselSlide(v, existingId);
      const saved: CarouselSlide = { id: savedId, ...v };
      this.slides.update(list =>
        existingId ? list.map(s => s.id === existingId ? saved : s) : [...list, saved],
      );
      this.editingSlide.set(null);
      this.slideForm.reset();
      this.flash('Slide sauvegardé.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la sauvegarde du slide.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected async deleteSlide(id: string): Promise<void> {
    if (!confirm('Supprimer ce slide ?')) return;
    this.saving.set(true);
    try {
      await this.firebase.deleteCarouselSlide(id);
      this.slides.update(list => list.filter(s => s.id !== id));
      this.flash('Slide supprimé.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la suppression.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  // ── SERVICE META ──────────────────────────────────────────────────────────

  protected async saveServiceMeta(): Promise<void> {
    if (this.serviceMetaForm.invalid) { this.serviceMetaForm.markAllAsTouched(); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    try {
      const meta = this.serviceMetaForm.getRawValue();
      await this.firebase.saveServiceMeta(meta);
      this.serviceMeta.set(meta);
      this.flash('Métadonnées sauvegardées.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la sauvegarde des métadonnées.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  // ── SERVICE ITEMS CRUD ────────────────────────────────────────────────────

  protected startEditService(service: ServiceItem | null): void {
    const blank: ServiceItem = {
      id: '', icon: 'bi-activity', title: '', description: '', link: '#',
      downloadUrl: '#', downloadLabel: 'Télécharger', downloadStoragePath: '',
      order: this.serviceItems().length,
    };
    this.editingService.set(service ?? blank);
    this.serviceForm.patchValue(service ?? blank);
    this.serviceFile.set(null);
    this.errorMsg.set('');
  }

  protected cancelService(): void {
    this.editingService.set(null);
    this.serviceForm.reset();
    this.serviceFile.set(null);
  }

  protected onServiceFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.serviceFile.set(input.files?.[0] ?? null);
  }

  protected async saveService(): Promise<void> {
    if (this.serviceForm.invalid) { this.serviceForm.markAllAsTouched(); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    try {
      const v = this.serviceForm.getRawValue();
      const editing = this.editingService()!;
      const existingId = editing.id || undefined;

      let downloadUrl = editing.downloadUrl || '#';
      let downloadStoragePath = editing.downloadStoragePath || '';

      const file = this.serviceFile();
      if (file) {
        if (downloadStoragePath) await this.firebase.deleteStorageFile(downloadStoragePath);
        const storageName = existingId ?? `new-${Date.now()}`;
        downloadStoragePath = `service-downloads/${storageName}/${file.name}`;
        downloadUrl = await this.firebase.uploadFile(downloadStoragePath, file);
      }

      const item: Omit<ServiceItem, 'id'> = { ...v, downloadUrl, downloadStoragePath };
      const savedId = await this.firebase.saveServiceItem(item, existingId);
      const saved: ServiceItem = { id: savedId, ...item };

      this.serviceItems.update(list =>
        existingId ? list.map(s => s.id === existingId ? saved : s) : [...list, saved],
      );
      this.editingService.set(null);
      this.serviceForm.reset();
      this.serviceFile.set(null);
      this.flash('Service sauvegardé.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la sauvegarde du service.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  protected async deleteService(item: ServiceItem): Promise<void> {
    if (!confirm(`Supprimer "${item.title}" ?`)) return;
    this.saving.set(true);
    try {
      if (item.downloadStoragePath) await this.firebase.deleteStorageFile(item.downloadStoragePath);
      await this.firebase.deleteServiceItem(item.id);
      this.serviceItems.update(list => list.filter(s => s.id !== item.id));
      this.flash('Service supprimé.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la suppression.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }

  // ── CTA ───────────────────────────────────────────────────────────────────

  protected onCtaBgFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ctaBgFile.set(input.files?.[0] ?? null);
  }

  protected onCtaDownloadFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ctaDownloadFile.set(input.files?.[0] ?? null);
  }

  protected async saveCta(): Promise<void> {
    if (this.ctaForm.invalid) { this.ctaForm.markAllAsTouched(); return; }
    this.saving.set(true);
    this.errorMsg.set('');
    try {
      const current = this.ctaContent();
      let {
        backgroundImageUrl, backgroundImageWidth, backgroundImageHeight,
        backgroundStoragePath, buttonLink, downloadStoragePath,
      } = current;

      const bgFile = this.ctaBgFile();
      if (bgFile) {
        if (backgroundStoragePath) await this.firebase.deleteStorageFile(backgroundStoragePath);
        backgroundStoragePath = `cta/background/${bgFile.name}`;
        backgroundImageUrl = await this.firebase.uploadFile(backgroundStoragePath, bgFile);
        backgroundImageWidth = 1920;
        backgroundImageHeight = 1080;
      }

      const dlFile = this.ctaDownloadFile();
      if (dlFile) {
        if (downloadStoragePath) await this.firebase.deleteStorageFile(downloadStoragePath);
        downloadStoragePath = `cta/download/${dlFile.name}`;
        buttonLink = await this.firebase.uploadFile(downloadStoragePath, dlFile);
      }

      const v = this.ctaForm.getRawValue();
      const updated: CtaContent = {
        ...v,
        backgroundImageUrl, backgroundImageWidth, backgroundImageHeight,
        backgroundStoragePath, buttonLink, downloadStoragePath,
      };
      await this.firebase.saveCtaContent(updated);
      this.ctaContent.set(updated);
      this.ctaBgFile.set(null);
      this.ctaDownloadFile.set(null);
      this.flash('CTA sauvegardé.');
    } catch (err) {
      this.errorMsg.set('Erreur lors de la sauvegarde du CTA.');
      console.error(err);
    } finally {
      this.saving.set(false);
    }
  }
}
