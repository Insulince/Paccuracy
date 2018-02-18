import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GrowlService} from "./services/growl.service";
import {Message} from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  @ViewChild('myModal') myModal:ElementRef;
  messages: Array<Message> = [];

  constructor(private growlService: GrowlService) {
  }

  ngOnInit(): void {
    this.myModal.nativeElement.click();
    this.growlService.messageAdded.subscribe(
      (message: Message): void => {
        this.messages.push(message);
      },
      (error: Error): void => {
        console.error(error);
      }
    );
  }
}
