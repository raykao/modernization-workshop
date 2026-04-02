import { Routes } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageViewComponent } from './components/image-view/image-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/images', pathMatch: 'full' },
  { path: 'images', component: ImageListComponent },
  { path: 'images/upload', component: ImageUploadComponent },
  { path: 'images/:key', component: ImageViewComponent },
];
