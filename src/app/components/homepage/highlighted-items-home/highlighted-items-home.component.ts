import { Component, OnInit } from '@angular/core';
import { ApiWebcorporateService } from '../../../services/api-webcorporate.service';
import { HighlightedItem } from '../../../models/highlighted-item.model';

@Component({
  selector: 'app-highlighted-items-home',
  templateUrl: './highlighted-items-home.component.html',
  styleUrls: ['./highlighted-items-home.component.css']
})
export class HighlightedItemsHomeComponent implements OnInit {
  
highlighted_items: HighlightedItem[] = [];


constructor(private http:ApiWebcorporateService) {

    this.http.getHighlightedItems()
      .subscribe( (resp: any) => {
        this.highlighted_items = resp.data;

      });

}


ngOnInit() {
}

}
