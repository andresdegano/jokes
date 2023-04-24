import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JokeModel } from '@shared/models/jokes.model';
import * as moment from 'moment';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
})
export class JokeFormComponent implements AfterContentInit {
  @Input() joke?: JokeModel;
  @Input() isLoading?: boolean;

  @Output() jokeChange = new EventEmitter<JokeModel>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  form = new FormGroup({
    Title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    Body: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    Author: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(160),
    ]),
    Views: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor() {}

  ngAfterContentInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.jokeChange.emit({
        Title: value.Title || '',
        Body: value.Body || '',
        Author: value.Author || '',
        Views: value.Views || 0,
        CreatedAt: moment().toISOString(),
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'joke') {
          if (changes[propName].currentValue) {
            this.form.setValue(
              {
                Title: changes[propName].currentValue.Title,
                Body: changes[propName].currentValue.Body,
                Author: changes[propName].currentValue.Author,
                Views: changes[propName].currentValue.Views,
              },
              { onlySelf: false, emitEvent: false }
            );
          }
        }
      }
    }
  }
}
