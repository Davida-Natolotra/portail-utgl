import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { getApp } from 'firebase/app';
import type {
  CarouselSlide,
  CtaContent,
  ServiceItem,
  ServiceSectionMeta,
} from '../shared/firebase-models';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly db = getFirestore(getApp());
  private readonly storage = getStorage(getApp());

  // ── CAROUSEL ──────────────────────────────────────────────────────────────

  async getCarouselSlides(): Promise<CarouselSlide[]> {
    const q = query(
      collection(this.db, 'carousel-slides'),
      orderBy('order'),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }) as CarouselSlide);
  }

  async saveCarouselSlide(
    slide: Omit<CarouselSlide, 'id'>,
    id?: string,
  ): Promise<string> {
    if (id) {
      await setDoc(doc(this.db, 'carousel-slides', id), slide);
      return id;
    }
    const docRef = await addDoc(collection(this.db, 'carousel-slides'), slide);
    return docRef.id;
  }

  async deleteCarouselSlide(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'carousel-slides', id));
  }

  // ── SERVICES ──────────────────────────────────────────────────────────────

  async getServiceMeta(): Promise<ServiceSectionMeta | null> {
    const snap = await getDoc(doc(this.db, 'sections', 'services-meta'));
    return snap.exists() ? (snap.data() as ServiceSectionMeta) : null;
  }

  async saveServiceMeta(meta: ServiceSectionMeta): Promise<void> {
    await setDoc(doc(this.db, 'sections', 'services-meta'), meta);
  }

  async getServiceItems(): Promise<ServiceItem[]> {
    const q = query(
      collection(this.db, 'service-items'),
      orderBy('order'),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }) as ServiceItem);
  }

  async saveServiceItem(
    item: Omit<ServiceItem, 'id'>,
    id?: string,
  ): Promise<string> {
    if (id) {
      await setDoc(doc(this.db, 'service-items', id), item);
      return id;
    }
    const docRef = await addDoc(collection(this.db, 'service-items'), item);
    return docRef.id;
  }

  async deleteServiceItem(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'service-items', id));
  }

  // ── CTA ───────────────────────────────────────────────────────────────────

  async getCtaContent(): Promise<CtaContent | null> {
    const snap = await getDoc(doc(this.db, 'sections', 'cta-content'));
    return snap.exists() ? (snap.data() as CtaContent) : null;
  }

  async saveCtaContent(content: CtaContent): Promise<void> {
    await setDoc(doc(this.db, 'sections', 'cta-content'), content);
  }

  // ── STORAGE ───────────────────────────────────────────────────────────────

  async uploadFile(storagePath: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, storagePath);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  async deleteStorageFile(storagePath: string): Promise<void> {
    if (!storagePath) return;
    try {
      await deleteObject(ref(this.storage, storagePath));
    } catch {
      // File may already be deleted or path invalid — safe to ignore
    }
  }
}
