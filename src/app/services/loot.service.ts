import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Loot } from '../types';

@Injectable({
    providedIn: 'root',
})
export class LootService {
    constructor(private readonly _router: Router) {}

    onClick(lootType: Loot): void {
        if (lootType === 'gold_1418' || lootType === 'gold_1419') {
            this._router.navigate([lootType]);
        }
    }
}
