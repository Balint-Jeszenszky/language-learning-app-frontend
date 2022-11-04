import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id?: number;
  name: string = '';
  description: string = '';
  deadline?: Date = undefined;
  studentEmails: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly courseService: CourseService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.courseService.getCourseDetailsById(this.id).subscribe(res => {
        this.name = res.name;
        this.deadline = res.deadline;
        this.description = res.description;
        this.studentEmails = res.students;
      });
    });
  }

  saveCourse() {
    if (!this.id) {
      return;
    }

    this.courseService.editCourse({
      id: this.id,
      description: this.description,
      deadline: this.deadline,
      name: this.name,
      studentEmails: this.studentEmails
    }).subscribe({
      next: res => this.router.navigate(['course', res.id]),
      error: err => this.snackBar.open(err.error, 'OK', { duration: 5000 }),
    });
  }

}
