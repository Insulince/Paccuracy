import {Component, Input, OnInit} from "@angular/core";
import {PaccurateResponse} from "../../model/model";

@Component({
  selector: "app-paccurate-response-view",
  templateUrl: "./paccurate-response-view.component.html",
  styleUrls: ["./paccurate-response-view.component.scss"]
})
export class PaccurateResponseViewComponent implements OnInit {
  @Input()
  paccurateResponse: PaccurateResponse;

  constructor() {
  }

  ngOnInit(): void {
  }
}
