import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {BoxWrapper, PaccurateLeftOverDataTable, PaccurateResponse, PaccurateResponseDataTable} from "../../model/model";
import {PaccurateService} from "../../services/paccurate.service";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import {groupBy} from "lodash";
import {GrowlService} from "../../services/growl.service";

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
  private polygonRegex = /<polygon (.*?)>/gi;

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

        this.growlService.add({
          severity: response.lenLeftovers === 0 ? "success" : "warn",
          summary: response.lenLeftovers === 0 ? "Success" : "Success with leftovers",
          detail: response.lenLeftovers === 0 ? "Packaging successful!" : "Packaging succeeded for most of your items, but some exceeded the maximum weight and/or maximum size."
        });

        return this.svgs.changes;
      })
      .subscribe(data => {
        this.svgs.forEach(
          (svg, i) => {
            svg.nativeElement.style = "transform: translateY(0px); transition: all 0.5s ease-in-out";
            const svgsWithoutPolygons = this.paccurateResponse.svgs[i].replace(this.polygonRegex, "");
            const polygons = this.paccurateResponse.svgs[i].match(this.polygonRegex);

            svg.nativeElement.innerHTML = svgsWithoutPolygons;
            const svgElement = svg.nativeElement.firstChild.firstChild;
            polygons.forEach(polygon => {
              polygon = polygon.replace(/class='volume-line'/gi, `class='volume-line animated bounceInDown'`);
              setTimeout(() => {
                svgElement.insertAdjacentHTML("beforeend", polygon);
              }, 500);
            });
          }
        );
      });
  }

  private constructPaccurateResponseDataTable(response: PaccurateResponse) {
    response.boxes.forEach((boxWrapper: BoxWrapper, index: number) => {
      const responseData: PaccurateResponseDataTable = new PaccurateResponseDataTable();
      responseData.boxName = boxWrapper.box.name;
      responseData.boxDim = `${boxWrapper.box.dimensions.x}x${boxWrapper.box.dimensions.y}x${boxWrapper.box.dimensions.z}`;
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
