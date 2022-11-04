import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseDetails, CreateCourseRequest, CreateCourseResponse, EditCourseRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/course/all');
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

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`/api/course/${id}`);
  }
}
