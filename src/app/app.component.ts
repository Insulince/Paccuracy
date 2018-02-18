import {Component, OnInit} from "@angular/core";
import {GrowlService} from "./services/growl.service";
import {Message} from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  messages: Array<Message> = [];
  formToggled = false;

  constructor(private growlService: GrowlService) {
  }

  ngOnInit(): void {
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
