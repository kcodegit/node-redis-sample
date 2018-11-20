'use strict';

var p = console.log,
  SubmissionRepository = require('./SubmissionRepository');

class Submission {
  constructor(id, survey_id, opinion, gender, age){
    this.id = id;
    this.survey_id = survey_id;
    this.opinion = opinion;
    this.gender = gender;
    this.age = age;
  }

  submit(){
    return SubmissionRepository.add(this.survey_id, this.opinion, this.gender, this.age)
  }
}

module.exports = Submission
