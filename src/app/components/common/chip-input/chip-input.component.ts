import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() data: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.data.push(value);
    }

    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.data.indexOf(value);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }

}
