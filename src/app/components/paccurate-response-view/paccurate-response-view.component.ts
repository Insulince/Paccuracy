import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {PaccurateResponse} from "../../model/model";

@Component({
  selector: "app-paccurate-response-view",
  templateUrl: "./paccurate-response-view.component.html",
  styleUrls: ["./paccurate-response-view.component.scss"]
})
export class PaccurateResponseViewComponent implements OnInit, AfterViewInit {
  @Input()
  paccurateResponse: PaccurateResponse;

  @ViewChildren("svgs")
  svgs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.svgs.forEach(
      (svg, i) => {
        svg.nativeElement.innerHTML = this.paccurateResponse.svgs[i];
      }
    );
  }
}
