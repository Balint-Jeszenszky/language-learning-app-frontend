import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CreateCourseRequest, CreateCourseResponse, WordPair } from './types';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/course/teacher/all');
  }

  getWordPairsByCourse(id: number): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(`/api/course/${id}/words`);
  }

  createCourse(payload: CreateCourseRequest): Observable<CreateCourseResponse> {
    return this.http.post<CreateCourseResponse>('/api/course', payload);
  }
}
