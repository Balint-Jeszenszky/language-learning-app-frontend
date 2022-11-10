import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WordPair } from 'src/app/services/types';
import { WordPairService } from 'src/app/services/word-pair.service';

@Component({
  selector: 'app-edit-words',
  templateUrl: './edit-words.component.html',
  styleUrls: ['./edit-words.component.css']
})
export class EditWordsComponent implements OnInit {
  id?: number;
  wordPairs?: WordPair[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly wordPairService: WordPairService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.wordPairService.getWordPairsByCourse(this.id).subscribe(wordPairs => this.wordPairs = wordPairs);
    });
  }

  remove(wordPair: WordPair) {
    window.confirm(`Do you want to remove "${wordPair.word}"`)
    const index = this.wordPairs?.indexOf(wordPair) ||-1;

    if (index >= 0) {
      this.wordPairs?.splice(index, 1);
    }
  }

  add() {
    this.wordPairs?.push({
      word: '',
      translation: '',
    });
  }

  saveWordPairs() {
    if (!this.id || !this.wordPairs) {
      return;
    }

    this.wordPairService.editWords(this.id, this.wordPairs).subscribe({
      next: () => this.router.navigate(['course', this.id]),
      error: err => this.snackBar.open(err.error, 'OK', { duration: 5000 }),
    });
  }

}
