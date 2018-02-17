import {Component, OnInit} from "@angular/core";
import {PaccurateService} from "./services/paccurate.service";
import {BoxType, Coordinates, ItemSet, PaccurateRequest, PaccurateResponse} from "./model/model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  public paccurateResponse: PaccurateResponse;
  public loading: boolean;

  constructor(private paccurateService: PaccurateService) {
  }

  ngOnInit(): void {
    this.loading = true;
    const paccurateRequest: PaccurateRequest = new PaccurateRequest(
      [
        new ItemSet(
          1,
          new Coordinates(
            1,
            5,
            300
          ),
          1,
          "item1Name"
        ),
        new ItemSet(
          1,
          new Coordinates(
            4,
            1,
            2
          ),
          1,
          "item2Name"
        )
      ],
      [
        new BoxType(
          10,
          "box1Name",
          new Coordinates(
            10,
            10,
            10
          ),
          1
        ),
        new BoxType(
          15,
          "box2Name",
          new Coordinates(
            12,
            5,
            8
          ),
          1
        )
      ],
      true,
      1
    );

    this.paccurateService.submitPackingRequest(paccurateRequest).subscribe(
      (paccurateResponse: PaccurateResponse): void => {
        this.paccurateResponse = paccurateResponse;
      },
      (error: Error): void => {
        console.error(error);
      },
      (): void => {
        console.log("Done");
        this.loading = false;
      }
    );
  }
}
