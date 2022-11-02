import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetails, WordPair } from 'src/app/services/types';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  wordPairs: WordPair[] = [];
  courseDetails?: CourseDetails;
  displayedColumns: string[] = ['email'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      this.courseService.getWordPairsByCourse(courseId).subscribe(wordPairs => this.wordPairs = wordPairs);
      this.courseService.getCourseDetailsById(courseId).subscribe(courseDetails => {
        if (courseDetails.deadline) {
          courseDetails.deadline = new Date(courseDetails.deadline);
        }
        this.courseDetails = courseDetails;
      });
    });
  }

}
