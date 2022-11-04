import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { WordPair } from 'src/app/services/types';
import { WordPairService } from 'src/app/services/word-pair.service';

@Component({
  selector: 'app-edit-words',
  templateUrl: './edit-words.component.html',
  styleUrls: ['./edit-words.component.css']
})
export class EditWordsComponent implements OnInit {
  id?: number;
  wordPairs: WordPair[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly wordPairService: WordPairService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.wordPairService.getWordPairsByCourse(this.id).subscribe(wordPairs => this.wordPairs = wordPairs);
    });
  }

  remove(wordPair: WordPair) {
    window.confirm(`Do you want to remove "${wordPair.word}"`)
    const index = this.wordPairs.indexOf(wordPair);

    if (index >= 0) {
      this.wordPairs.splice(index, 1);
    }
  }

  add() {
    this.wordPairs.push({
      word: '',
      translation: '',
      metadata: [],
    });
  }

  saveWordPairs() {
    if (!this.id) {
      return;
    }

    this.wordPairService.editWords(this.id, this.wordPairs).subscribe(() => {
      this.router.navigate(['course', this.id]);
    });
  }

}
