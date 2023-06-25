import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <div
    class="p-8 bg-gradient-to-b from-slate-100 to-slate-300 h-screen"
  >
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent {}
