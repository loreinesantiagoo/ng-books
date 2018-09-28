import { Component, ViewChild, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';


export interface BooksRec {
  id: number;
  title: string;
  author: string;
  thumbnail: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-children-books';

  displayedColumns: string[] = ['id', 'title', 'author', 'thumbnail'];
  library = [];
  dataSource = [];

  sortedData = [];
  keyword = '';
  selectionType = [];

  selections = [
    { viewValue: 'Book Title', value: 'BT' },
    { viewValue: 'Author', value: 'A' },
    { viewValue: 'Title and Author', value: 'TA' }
  ];

  searchCriteria = {
    'offset': 0,
    'limit': 10,
    'keyword': '',
    'selectionType': ['']
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookSvc: BookService) {
    // this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.bookSvc.getAllBooks(this.searchCriteria).subscribe((results) => {
      console.log(results);
      this.dataSource = results;
      this.sortedData = this.library.slice();
    });
  }

  sortData(sort: Sort) {
    console.log('sorting ...');
    const data = this.library.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    console.log('>>> ' + JSON.stringify(data));

    this.sortedData = data.sort((a, b) => {
      console.log('data sort' + JSON.stringify(a));
      console.log('data sort' + JSON.stringify(b));

      const isAsc = sort.direction === 'asc';
      console.log('>>>' + sort.active);

      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'author': return compare(a.first_name, b.first_name, isAsc);
        case 'title and author': return compare(a.NB, b.NB, isAsc);
        default: return 0;
      }
    });
  }

  search() {
    console.log('subscribe backend...');
    this.searchCriteria.keyword = this.keyword;
    this.searchCriteria.selectionType = this.selectionType;

    this.bookSvc.getAllBooks(this.searchCriteria).subscribe((results) => {
      console.log(results);
      this.dataSource = results;
    });
  }

  function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(filterValue: value) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
  }
}
