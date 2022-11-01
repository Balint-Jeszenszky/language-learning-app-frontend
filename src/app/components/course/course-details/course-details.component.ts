import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { WordPair } from 'src/app/services/types';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  wordPairs: WordPair[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      this.courseService.getWordPairsByCourse(courseId).subscribe(wordPairs => this.wordPairs = wordPairs);
    });
  }

}
