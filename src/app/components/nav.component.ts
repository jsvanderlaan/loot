import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'nav',
    imports: [CommonModule, RouterLink],
    template: ` <div class="flex flex-row justify-between text-xs mt-8 text-cyan-600">
        <a routerLink="/player">players</a>
        <a routerLink="/deck">deck</a>
        <a routerLink="/loot">loot</a>
        <a routerLink="/gold_1418">gold_1418</a>
        <a routerLink="/gold_1419">gold_1419</a>
    </div>`,
})
export class NavComponent {}
