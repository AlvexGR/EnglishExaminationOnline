import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-plain-paragraph",
  templateUrl: "./plain-paragraph.component.html",
  styleUrls: ["./plain-paragraph.component.css"]
})
export class PlainParagraphComponent implements OnInit {
  private _content: string;

  @Input()
  set content(content: string) {
    this._content = content;
  }

  get content(): string {
    return this._content;
  }
  constructor() {}

  ngOnInit() {}
}
