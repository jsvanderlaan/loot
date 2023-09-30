import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1 class="text-3xl mb-8 text-center">gold_1419</h1>
        <div class="flex flex-col space-y-4">
            <div *ngFor="let story of stories">
                <input type="checkbox" [id]="story" class="mx-2" [checked]="isChecked(story)" (change)="check(story)" />
                <label [for]="story">{{ story }}</label>
            </div>
        </div>
    `,
})
export class Gold1419Component {
    private _checked: string[];
    stories = ['36.4', '29.1', '188.2', '182.3', '85.1', '11.1', '128.5', '153.4', '193.5', '9.3'];

    constructor(private readonly store: StateService) {
        this._checked = store.gold_1419() ?? [];
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
        this.store.setGold_1419(this._checked);
    }
}
