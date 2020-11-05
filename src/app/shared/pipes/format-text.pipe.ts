import { Pipe, PipeTransform } from '@angular/core';

export interface ITextElement {}

export class TextParagraph implements ITextElement {
  text: string;
}

export class TextList implements ITextElement {
  items: string[];
}

@Pipe({ name: 'formatText' })
export class FormatTextPipe implements PipeTransform {
  romanize(index: number): string {
    if (!+index) return '';

    const digits = String(+index).split(''),
      key = [
        '',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
      ];

    let roman = '',
      i = 3;

    while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;

    return (Array(+digits.join('') + 1).join('M') + roman).toLowerCase();
  }

  listIndices(value: string): string[] {
    let listIndices: string[] = [];

    while (value.indexOf(`${this.romanize(listIndices.length + 1)})`) >= 0) {
      listIndices.push(`${this.romanize(listIndices.length + 1)})`);
    }

    return listIndices;
  }

  transform(value: string): ITextElement[] {
    const paragraphs = value
      .split(/(?:\r\n|\r|\n)/g)
      .filter((paragraph) => paragraph.length > 0);

    return paragraphs.map((paragraph: string) => {
      paragraph = paragraph.trim();

      const listIndices = this.listIndices(paragraph);

      if (listIndices.length == 0) return { text: paragraph };

      const listItems: string[] = [];

      for (let i = 0; i < listIndices.length; i++) {
        const endIndex =
          i == listIndices.length - 1
            ? undefined
            : paragraph.indexOf(listIndices[i + 1]);

        const listItem = paragraph
          .slice(paragraph.indexOf(listIndices[i]), endIndex)
          .replace(listIndices[i], '')
          .trim();
        listItems.push(listItem);
      }

      return { items: listItems };
    });
  }
}
