import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'text-scramble',
  template: `<span [innerHTML]="text"></span>`
})
export class TextScrambleComponent implements OnInit {
  @Input() phrases: string[] = [];
  private chars: string = "!<>-_\\/[]{}—=+*^?#________";
  private frameRequest: number;
  private frame: number = 0;
  private queue: any[] = [];
  private phrasesCounter: number = 0;
  text: string = '';

  ngOnInit() {
    this.next();
  }

  setText(newText: string) {
    const oldText = this.text || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => setTimeout(resolve, 2000));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({
        from,
        to,
        start,
        end
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.text = output;
    if (complete !== this.queue.length) {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    } else {
      setTimeout(() => this.next(), 2000);
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  next() {
    this.setText(this.phrases[this.phrasesCounter]);
    this.phrasesCounter = (this.phrasesCounter + 1) % this.phrases.length;
  }
}
