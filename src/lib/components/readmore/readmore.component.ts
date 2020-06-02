import { Component, Input, ElementRef, OnChanges} from '@angular/core';

@Component({    
    selector: 'read-more',
    template: `
        <div [class]="class" [innerHTML]="currentText"></div>
        <a [class.hidden]="hideToggle" (click)="toggleView()">{{isCollapsed? readMoreText:readLessText}}</a>
    `
})


export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() maxLength: number = 100;
    @Input() class: string = '';
    @Input() readMoreText: string = 'VIEW MORE';
    @Input() readLessText: string = 'VIEW LESS';

    currentText: string;
    hideToggle: boolean = true;

    public isCollapsed: boolean = true;

    constructor(private elementRef: ElementRef) {

    }
    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }
    determineView() {
        if(this.text) {
            if (this.text.length <= this.maxLength) {
                this.currentText = this.text;
                this.isCollapsed = false;
                this.hideToggle = true;
                return;
            }
            this.hideToggle = false;
            if (this.isCollapsed == true) {
                this.currentText = this.text.substring(0, this.maxLength) + "...";
            } else if(this.isCollapsed == false)  {
                this.currentText = this.text;
            }
        } //End if
    }
    ngOnChanges() {
        this.determineView();       
    }
}