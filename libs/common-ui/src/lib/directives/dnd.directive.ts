import {
  Directive,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[dnd]',
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover')
  fileover = false;

  @HostListener('dragover', ['$event'])
  onDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = true;
  }
  @HostListener('dragleave', ['$event'])
  onDragleave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
