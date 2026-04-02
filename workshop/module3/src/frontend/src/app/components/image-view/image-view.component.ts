import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { ImageResponse } from '../../models/image-response';

@Component({
  selector: 'app-image-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-view.component.html',
  styleUrl: './image-view.component.scss'
})
export class ImageViewComponent implements OnInit {
  image?: ImageResponse;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key');
    if (!key) return;
    this.imageService.getImages().subscribe({
      next: images => {
        this.image = images.find(img => img.key === key);
        if (!this.image) this.notFound = true;
      },
      error: () => (this.notFound = true)
    });
  }
}
