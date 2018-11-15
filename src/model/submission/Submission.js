'use strict';

var p = console.log;

class Submission {
  constructor(id, survey_id, opinion, gender, age){
    this.id = id;
    this.survey_id = survey_id;
    this.opinion = opinion;
    this.gender = gender;
    this.age = age;
  }
}

const Opinion = Object.freeze({
  AGREE: 0,
  DISAGREE: 1
});

const Gender = Object.freeze({
  MALE: 0,
  FEMALE: 1
});

module.exports = Submission
