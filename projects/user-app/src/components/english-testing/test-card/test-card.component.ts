import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test-card",
  templateUrl: "./test-card.component.html",
  styleUrls: ["./test-card.component.css"]
})
export class TestCardComponent implements OnInit {
  starOne: boolean;
  starTwo: boolean;
  starThree: boolean;
  starFour: boolean;
  starFive: boolean;
  noStarOne: boolean;
  noStarTwo: boolean;
  noStarThree: boolean;
  noStarFour: boolean;
  noStarFive: boolean;
  halfStar: boolean;

  title: string;
  subtitle: string;
  content: string;
  time: string;

  constructor() {}

  ngOnInit() {}
}
