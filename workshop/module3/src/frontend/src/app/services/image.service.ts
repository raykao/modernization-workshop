import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageResponse } from '../models/image-response';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private apiUrl = '/api/images';

  constructor(private http: HttpClient) {}

  getImages(): Observable<ImageResponse[]> {
    return this.http.get<ImageResponse[]>(this.apiUrl);
  }

  uploadImage(file: File): Observable<ImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageResponse>(this.apiUrl, formData);
  }

  deleteImage(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}`);
  }
}
