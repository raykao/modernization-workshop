import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  uploadProgress = 0;
  uploading = false;
  dragOver = false;

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  upload(): void {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.uploadProgress = 0;
    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.router.navigate(['/images']);
      },
      error: () => {
        this.uploading = false;
      }
    });
  }
}
