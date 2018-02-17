import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {PaccurateResponse} from "../../model/model";
import {PaccurateService} from "../../services/paccurate.service";

@Component({
  selector: "app-paccurate-response-view",
  templateUrl: "./paccurate-response-view.component.html",
  styleUrls: ["./paccurate-response-view.component.scss"]
})
export class PaccurateResponseViewComponent implements OnInit, AfterViewInit {
  public paccurateResponse: PaccurateResponse;
  public loading: boolean;

  @ViewChildren("svgs") svgs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private paccurateService: PaccurateService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.paccurateService.paccurateResponseObs.subscribe(
      (response: PaccurateResponse): void => {
        this.paccurateResponse = response;
        this.loading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.svgs.forEach(
      (svg, i) => {
        svg.nativeElement.innerHTML = this.paccurateResponse.svgs[i];
      }
    );
  }
}
