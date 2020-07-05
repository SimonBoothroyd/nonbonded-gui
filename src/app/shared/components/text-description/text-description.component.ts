import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITextElement, TextList, TextParagraph } from '@shared/pipes/format-text.pipe';

@Component({
  selector: 'app-text-description',
  templateUrl: './text-description.component.html',
  styleUrls: ['./text-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextDescriptionComponent implements OnInit {
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {}

  isTextElement(textElement: ITextElement): boolean {
    return textElement instanceof TextParagraph;
  }
  isListElement(textElement: ITextElement): boolean {
    return textElement instanceof TextList;
  }
}
