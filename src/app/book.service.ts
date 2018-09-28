import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '..//environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  finalSearchCriteria: string;

  constructor(private http: HttpClient) { }

  getAllBooks(criteria): Observable<any> {

    // tslint:disable-next-line:max-line-length
    this.finalSearchCriteria = `/api/books?offset=${criteria.offset}&limit=${criteria.limit}&keyword=${criteria.keyword}&selectionType=${criteria.selectionType}`;
    console.log(this.finalSearchCriteria);
    return this.http
      .get(`${environment.api_url}${this.finalSearchCriteria}`)
      .pipe(
        catchError(this.handleError('getAllGro', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
