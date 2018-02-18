import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {BoxWrapper, PaccurateLeftOverDataTable, PaccurateResponse, PaccurateResponseDataTable} from "../../model/model";
import {PaccurateService} from "../../services/paccurate.service";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import {groupBy} from "lodash";
import {GrowlService} from "../../services/growl.service";
import {Message} from "primeng/api";

@Component({
  selector: "app-paccurate-response-view",
  templateUrl: "./paccurate-response-view.component.html",
  styleUrls: ["./paccurate-response-view.component.scss"]
})
export class PaccurateResponseViewComponent implements OnInit {
  public paccurateResponse: PaccurateResponse;
  public loading: boolean;
  public requestSubmitted: boolean;
  public paccurateResponseData: PaccurateResponseDataTable[] = [];
  public paccurateLeftOverData: PaccurateLeftOverDataTable[] = [];

  @ViewChildren("svgs") svgs: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor(private paccurateService: PaccurateService,
              private growlService: GrowlService) {
  }

  ngOnInit(): void {
    this.requestSubmitted = false;
    this.loading = true;

    this.paccurateService.paccurateRequestSubmittedObs.subscribe(
      (): void => {
        this.requestSubmitted = true;
      }
    );

    this.paccurateService.paccurateResponseObs
      .filter(data => !!data)
      .mergeMap((response: PaccurateResponse) => {
        this.paccurateResponseData = [];
        this.paccurateLeftOverData = [];
        this.paccurateResponse = response;
        this.constructPaccurateResponseDataTable(response);
        if (response.lenLeftovers > 0) {
          this.constructPaccurateLeftOverDataTable(response);
        }
        this.loading = false;

        if (response.lenLeftovers === 0) {
          this.growlService.add({
            severity: "success",
            summary: "Success",
            detail: "Packaging successful!"
          });
        } else {
          this.growlService.add({
            severity: "error",
            summary: "Failure",
            detail: "Packaging failed!"
          });
        }

        return this.svgs.changes;
      })
      .subscribe(data => {
        console.log(data);
        this.svgs.forEach(
          (svg, i) => {
            svg.nativeElement.style = "transform: translateY(0px); transition: all 0.5s ease-in-out";
            svg.nativeElement.innerHTML = this.paccurateResponse.svgs[i];
          }
        );
      });
  }

  private constructPaccurateResponseDataTable(response: PaccurateResponse) {
    response.boxes.forEach((boxWrapper: BoxWrapper, index: number) => {
      const responseData: PaccurateResponseDataTable = new PaccurateResponseDataTable();
      responseData.box = `${boxWrapper.box.dimensions.x}x${boxWrapper.box.dimensions.y}x${boxWrapper.box.dimensions.z}`;
      responseData.volumeMax = boxWrapper.box.volumeMax;
      responseData.volumeRemaining = boxWrapper.box.volumeRemaining;
      responseData.volumeUsed = boxWrapper.box.volumeUsed;
      responseData.volumeUtilization = boxWrapper.box.volumeUtilization;
      responseData.weightMax = boxWrapper.box.weightMax;
      responseData.weightRemaining = boxWrapper.box.weightRemaining;
      responseData.weightUsed = boxWrapper.box.weightUsed;
      responseData.weightUtilization = boxWrapper.box.weightUtilization;

      this.paccurateResponseData.push(responseData);
    });
  }

  private constructPaccurateLeftOverDataTable(response: PaccurateResponse) {
    const uniqObj = groupBy(response.leftovers, "item.name");
    const uniqArrKeys = Object.keys(uniqObj);

    uniqArrKeys.forEach(key => {
      const leftOverData: PaccurateLeftOverDataTable = new PaccurateLeftOverDataTable();
      leftOverData.count = uniqObj[key].length;
      leftOverData.message = uniqObj[key][0].item.message;
      leftOverData.dimensions = uniqObj[key][0].item.dimensions;
      leftOverData.name = uniqObj[key][0].item.name;

      this.paccurateLeftOverData.push(leftOverData);
    });
  }
}
