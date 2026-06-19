import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface GalleryItem {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  imports: [NgOptimizedImage],
  templateUrl: './gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Gallery {
  protected readonly items: GalleryItem[] = [
    { src: 'assets/img/gallery/gallery-1.jpg', alt: 'Gallery image 1' },
    { src: 'assets/img/gallery/gallery-2.jpg', alt: 'Gallery image 2' },
    { src: 'assets/img/gallery/gallery-3.jpg', alt: 'Gallery image 3' },
    { src: 'assets/img/gallery/gallery-4.jpg', alt: 'Gallery image 4' },
    { src: 'assets/img/gallery/gallery-5.jpg', alt: 'Gallery image 5' },
    { src: 'assets/img/gallery/gallery-6.jpg', alt: 'Gallery image 6' },
    { src: 'assets/img/gallery/gallery-7.jpg', alt: 'Gallery image 7' },
    { src: 'assets/img/gallery/gallery-8.jpg', alt: 'Gallery image 8' },
  ];
}
