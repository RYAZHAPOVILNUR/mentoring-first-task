import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipe } from '../../../../core/pipes/custom-data.pipe';
import { CommonModule } from '@angular/common';
import { FileType } from '../../../../shared/enums/file-type.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MaterialType } from '../../../../shared/types/materials-types.type';
import { Store } from '@ngrx/store';
import { loadMaterial } from '../../../../core/state/material/materials/materials.actions';
import { getMaterial } from '../../../../core/state/material/materials/materials.selector';

@Component({
  selector: 'app-material-info',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CustomDatePipe, CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './material-info.component.html',
  styleUrl: './material-info.component.scss'
})
export class MaterialInfoComponent implements OnInit {
  materialData!: MaterialType;
  materialType!: FileType;
  FileType = FileType;
  safeUrl!: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { materialId: number },
    private sanitizer: DomSanitizer,
    private store: Store
  ) { }

  getMaterial() {
    this.store.dispatch(loadMaterial({ id: this.data.materialId }))
    this.store.select(getMaterial)
      .subscribe(data => {
        this.materialData = data;
        if (data.material_link.endsWith('.pdf')) {
          this.materialType = FileType.PDF;
        } else if (data.material_link.endsWith('.mp3')) {
          this.materialType = FileType.MP3;
        } else if (data.material_link.includes('youtu.be')) {
          this.materialType = FileType.VIDEO;
          const videoId = data.material_link.split('/').pop();
          const newUrl = `https://www.youtube.com/embed/${videoId}`;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
        }
      });
  }

  ngOnInit(): void {
    this.getMaterial()
  }
}