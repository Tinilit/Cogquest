import { Component, OnInit } from '@angular/core';
import { tol } from './tol/tol';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-tower-of-london',
  templateUrl: './tower-of-london.component.html',
  styleUrls: ['./tower-of-london.component.css']
})
export class TowerOfLondonComponent implements OnInit {
  public testConfig: object;

  constructor(private activatedRoute: ActivatedRoute,
     private testService: TestService) { }

  ngOnInit() {
    const gameSettings = {
      TestName: 'TestName',
      Instructions: 'Instructions',
      InstructionsFinish: 'InstructionsFinish',
      TxtButton: 'TxtButton',
      Feedback: 'Feedback',
      CountDownFrom: 5,
      TextOverMoves: 'TextOverMoves',
      TextOverTime: 'TextOverTime',
      DisplayResults: 'DisplayResults',
      TxtToSpeech: 'TxtToSpeech',
      PrctRounds: 0,
      TestRounds: 4,
      CalcResFrom: 'CalcResFrom',
      TimeOut: 30,
      MaxMoves: 'MaxMoves',
      ShowFeedback: 'ShowFeedback',
      WorkTag: 'WorkTag',
      GoalTag: 'GoalTag',
      CountDownText: 'CountDownText',
      Language: 'Language'
    };

    this.activatedRoute.queryParams.subscribe((params) => {
      this.testService.get(params.testId).subscribe(response => {
        this.testConfig = response.data.split('//||//||//');
        this.testConfig[0] = JSON.parse(this.testConfig[0]); // moves data
        this.testConfig[1] = JSON.parse(this.testConfig[1]); // form data
        tol.initGame(gameSettings, this.testConfig[0]);
      });
    });
  }
}
