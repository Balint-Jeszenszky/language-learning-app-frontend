import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
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
  chart?: Chart;

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
        this.createChart();
      });
    });
  }

  createChart() {
    if (!this.wordPairs) {
      return;
    }

    const scores = new Array(this.wordPairs.length + 1).fill(0);
    this.courseDetails?.students.forEach(s => {
      scores[s.score || 0]++;
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
