import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUplaodAvatar } from 'src/app/core/models';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
})
export class UploadAvatarComponent implements OnInit {
  @Output() onSelectAvatar: EventEmitter<IUplaodAvatar> = new EventEmitter();

  @Input() avatarUrl: string;

  constructor() {}

  ngOnInit(): void {}

  dropFile = (file) => this.processFile(file[0]);

  uploadFile = (input) => this.processFile(input.target.files[0]);

  processFile(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      this.avatarUrl = URL.createObjectURL(file);
      this.onSelectAvatar.emit({
        avatarUrl: this.avatarUrl,
        file,
      });
    };

    reader.readAsDataURL(file);
  }

  remove() {
    this.avatarUrl = null;
    this.onSelectAvatar.emit(null);
  }
}
