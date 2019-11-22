import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private _blockStudentUrl = "http://localhost:3000/api/blockstudent"
  private _unblockStudentUrl = "http://localhost:3000/api/unblockstudent"
  private _allBlockedStudentsUrl = "http://localhost:3000/api/allblockedstudents"

  private _blockMentorUrl = "http://localhost:3000/api/blockmentor"
  private _unblockMentorUrl = "http://localhost:3000/api/unblockmentor"
  private _allBlockedMentorsUrl = "http://localhost:3000/api/allblockedmentors"

  private _blockCourseUrl = "http://localhost:3000/api/blockcourse"
  private _unblockCourseUrl = "http://localhost:3000/api/unblockcourse"
  private _onecourseUrl = "http://localhost:3000/api/onecourse"

  constructor( private http : HttpClient) { }

  //student
  blockStudent (student) {
    return this.http.post<any>(this._blockStudentUrl, student)
  }

  unblockStudent (student) {
    return this.http.post<any>(this._unblockStudentUrl, student)
  }

  allBlockedStudents() {
    return this.http.get<any>(this._allBlockedStudentsUrl)
  }

//mentor
  blockMentor (mentor) {
    return this.http.post<any>(this._blockMentorUrl, mentor)
  }

  unblockMentor (mentor) {
    return this.http.post<any>(this._unblockMentorUrl, mentor)
  }

  allBlockedMentors () {
    return this.http.get(this._allBlockedMentorsUrl)
  }


  blockCourse (course) {
    return this.http.post<any>(this._blockCourseUrl, course)
  }

  unblockCourse (course) {
    return this.http.post<any>(this._unblockCourseUrl, course)
  }

  oneCourse(data) {
    return this.http.get<any>(this._onecourseUrl, data)
  }
}
