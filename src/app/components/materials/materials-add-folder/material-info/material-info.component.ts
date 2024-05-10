import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialService } from '../../../../core/services/materials-api-service.service';
import { MaterialType } from '../../../../shared/types/folders-types.type';
import { CustomDatePipe } from '../../../../core/pipes/custom-data.pipe';
import { CommonModule } from '@angular/common';
import { FileType } from '../../../../shared/enums/file-type.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-material-info',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CustomDatePipe, CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './material-info.component.html',
  styleUrl: './material-info.component.scss'
})
export class MaterialInfoComponent {
  materialData!: MaterialType;
  materialType!: FileType;
  FileType = FileType;
  safeUrl!: SafeResourceUrl;

  constructor(private service: MaterialService,
    @Inject(MAT_DIALOG_DATA) public data: { materialId: number },
    private sanitizer: DomSanitizer
  ) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge',
      this.service.getMaterial(data.materialId).subscribe((data: MaterialType) => {
        this.materialData = data;

        if (data.material_link.endsWith('.pdf')) {
          this.materialType = FileType.PDF;
          console.log(this.materialData.material_link);

        } else if (data.material_link.endsWith('.mp3')) {
          this.materialType = FileType.MP3;
        } else {
          this.materialType = FileType.VIDEO;
          const url = this.materialData.material_link; // замените на ваш URL
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      });
  }
}