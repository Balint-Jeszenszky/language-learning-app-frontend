import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetails, WordPair } from 'src/app/services/types';
import { WordPairService } from 'src/app/services/word-pair.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  wordPairs?: WordPair[];
  courseDetails?: CourseDetails;
  displayedColumns: string[] = ['name', 'email', 'score'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly wordPairService: WordPairService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      this.wordPairService.getWordPairsByCourse(courseId).subscribe(wordPairs => this.wordPairs = wordPairs);
      this.courseService.getCourseDetailsById(courseId).subscribe(courseDetails => {
        if (courseDetails.deadline) {
          courseDetails.deadline = new Date(courseDetails.deadline);
        }
        this.courseDetails = courseDetails;
      });
    });
  }

}
