import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1 class="text-3xl mb-8 text-center">gold_1418</h1>
        <div class="flex flex-col space-y-4">
            <div *ngFor="let story of stories">
                <input type="checkbox" [id]="story" class="mx-2" [checked]="isChecked(story)" (change)="check(story)" />
                <label [for]="story">{{ story }}</label>
            </div>
        </div>
    `,
})
export class Gold1418Component {
    private _checked: string[];
    stories = ['43.4', '133.4', '177.3', '165.3', '168.1', '130.4', '174.5', '106.3', '13.2', '16.2'];

    constructor(private readonly store: StateService) {
        this._checked = store.gold_1418() ?? [];
    }

    isChecked(story: string): boolean {
        return !!this._checked.find(x => x === story);
    }

    check(story: string): void {
        const i = this._checked.findIndex(x => x === story);
        if (i >= 0) {
            this._checked.splice(i, 1);
        } else {
            this._checked = [...this._checked, story];
        }
        this.store.setGold_1418(this._checked);
    }
}
