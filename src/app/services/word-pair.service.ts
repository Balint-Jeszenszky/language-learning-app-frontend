import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordPair } from './types';

@Injectable({
  providedIn: 'root'
})
export class WordPairService {
  
  constructor(private readonly http: HttpClient) { }

  getWordPairsByCourse(id: number): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(`/api/wordPair/words/${id}`);
  }

  editWords(id: number, payload: WordPair[]): Observable<WordPair[]> {
    return this.http.put<WordPair[]>(`/api/wordPair/words/${id}`, payload);
  }
}
