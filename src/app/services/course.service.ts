import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseDetails, CreateCourseRequest, CreateCourseResponse, EditCourseRequest, WordPair } from './types';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/course/all');
  }

  getWordPairsByCourse(id: number): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(`/api/course/${id}/words`);
  }

  getCourseDetailsById(id: number): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`/api/course/teacher/${id}`);
  }

  createCourse(payload: CreateCourseRequest): Observable<CreateCourseResponse> {
    return this.http.post<CreateCourseResponse>('/api/course', payload);
  }

  editCourse(payload: EditCourseRequest): Observable<CreateCourseResponse> {
    return this.http.put<CreateCourseResponse>('/api/course', payload);
  }

  editWords(id: number, payload: WordPair[]): Observable<WordPair[]> {
    return this.http.put<WordPair[]>(`/api/course/${id}/words`, payload);
  }
}
