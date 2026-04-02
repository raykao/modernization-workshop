import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ImageService } from '../../services/image.service';
import { ImageResponse } from '../../models/image-response';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit, OnDestroy {
  images: ImageResponse[] = [];
  private pollSub?: Subscription;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadImages();
    this.pollSub = interval(5000)
      .pipe(switchMap(() => this.imageService.getImages()))
      .subscribe(images => (this.images = images));
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  private loadImages(): void {
    this.imageService.getImages().subscribe(images => (this.images = images));
  }

  deleteImage(key: string): void {
    this.imageService.deleteImage(key).subscribe(() => this.loadImages());
  }
}
