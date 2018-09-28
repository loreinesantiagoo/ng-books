import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  constructor(private bookSvc: BookService) { }

  ngOnInit() {
  }

}
