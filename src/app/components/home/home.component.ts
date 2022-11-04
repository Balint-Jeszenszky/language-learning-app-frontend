import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course, CreateCourseRequest } from 'src/app/services/types';
import { NewCourseComponent } from './new-course/new-course.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'deadline', 'open'];
  courses?: Course[];

  constructor(
    private readonly router: Router,
    private readonly courseService: CourseService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      courses.forEach(c => {
        if (c.deadline) {
          c.deadline = new Date(c.deadline);
        }
      });
      this.courses = courses;
    });
  }

  createCourse() {
    const dialogRef = this.dialog.open(NewCourseComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: CreateCourseRequest) => {
      if (!result) {
        return;
      }

      this.courseService.createCourse(result).subscribe({
        next: res => this.router.navigate(['course', res.id]),
        error: err => this.snackBar.open(err.error, 'OK', { duration: 5000 }),
      });
    });
  }

}
