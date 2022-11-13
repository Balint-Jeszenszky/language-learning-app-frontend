import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { CourseService } from 'src/app/services/course.service';
import { CourseDetails, Student, Submission, WordPair } from 'src/app/services/types';
import { WordPairService } from 'src/app/services/word-pair.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourseDetailsComponent implements OnInit {
  wordPairs?: WordPair[];
  courseDetails?: CourseDetails;
  displayedColumns: string[] = ['name', 'email', 'score'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  chart?: Chart;
  expandedElement?: Student;
  submissions?: Submission[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly wordPairService: WordPairService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      this.wordPairService.getWordPairsByCourse(courseId).subscribe(wordPairs => {
        this.wordPairs = wordPairs;
        this.createChart();
      });
      this.courseService.getCourseDetailsById(courseId).subscribe(courseDetails => {
        if (courseDetails.deadline) {
          courseDetails.deadline = new Date(courseDetails.deadline);
        }
        this.courseDetails = courseDetails;
        this.createChart();
      });
    });
  }

  selectRow(element: Student) {
    this.submissions = undefined;
    this.expandedElement = this.expandedElement === element ? undefined : element;
    if (this.courseDetails?.id && this.expandedElement) {
      this.courseService.getUserSubmissions(this.courseDetails.id, this.expandedElement.id).subscribe(submissions => {
        submissions.forEach(s => s.submittedAt = new Date(s.submittedAt));
        this.submissions = submissions;
      });
    }
  }

  createChart() {
    if (!this.wordPairs || !this.courseDetails) {
      return;
    }

    const words = this.wordPairs.length;
    const scores = new Array(words + 1).fill(0);
    this.courseDetails?.students.forEach(s => {
      if (Number.isInteger(s.score)) {
        scores[Math.min(s.score!, words)]++;
      }
    });

    this.chart = new Chart("score", {
      type: 'bar',
      data: {
        labels: Object.keys(scores), 
	       datasets: [
          {
            label: "Scores",
            data: scores,
            backgroundColor: '#3f51b5',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              precision: 0,
            }
          }
        }
      }
    });
  }

}
