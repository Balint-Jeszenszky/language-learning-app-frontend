import { Component, OnInit } from '@angular/core';
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
  deadline?: Date = undefined;
  studentEmails: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.courseService.getCourseDetailsById(this.id).subscribe(res => {
        this.name = res.name;
        this.deadline = res.deadline;
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
      deadline: this.deadline,
      name: this.name,
      studentEmails: this.studentEmails
    }).subscribe(res => {
      this.router.navigate(['course', res.id]);
    });
  }

}
