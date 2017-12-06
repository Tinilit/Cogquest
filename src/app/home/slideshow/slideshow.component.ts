import {Component, NgModule} from '@angular/core';
import {PageSliderModule}    from 'ng2-page-slider';
 
@Component({
    selector: 'slideshow-component',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent {
    public pageNumber : number = 0;
    public pageCount : number = 0;
    public pages = [
        {image: "../../../assets/images/unsplash1.jpg"},
        {image: "../../../assets/images/unsplash6.jpg"}
    ];
} 
 
@NgModule({
    imports: [
        PageSliderModule
    ],
    declarations: [
        SlideshowComponent
    ]
})
export class SlideshowModule {
}