import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavComponent],
    template: ` <div class="p-8 bg-gradient-to-b from-slate-100 to-slate-300 min-h-screen">
        <router-outlet></router-outlet>
        <nav class="sticky top-[100vh]"></nav>
    </div>`,
})
export class AppComponent {}
