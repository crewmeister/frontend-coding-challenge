import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbsenseData, ABSENSE_DATA, MemberAbsenseData, MembersData, MEMBERS_DATA } from './input-data';

@Injectable()
export class WorkforceService {

  constructor() { }
  
  public getEmployeeAbsenseData(): Observable<MemberAbsenseData[]> {
    return new Observable<MemberAbsenseData[]>((absenseDataObservable) => {
      const mwmbersData: MembersData[] = JSON.parse(JSON.stringify(MEMBERS_DATA));
      const absenseData: AbsenseData[] = JSON.parse(JSON.stringify(ABSENSE_DATA));
      console.log(absenseData.length);
      let membersAbsenseData: MemberAbsenseData[] = [];
      absenseData.forEach((absRecord) => {
        const absentUserRecord: MembersData = mwmbersData.find((memberRecord) => {
          return absRecord.userId === memberRecord.userId;
        });
        membersAbsenseData.push({
          image: absentUserRecord.image,
          name: absentUserRecord.name,
          admitterId: absRecord.admitterId,
          admitterNote: absRecord.admitterId,
          confirmedAt: absRecord.confirmedAt,
          createdAt: absRecord.createdAt,
          crewId: absRecord.crewId,
          endDate: absRecord.endDate,
          id: absRecord.id,
          memberNote: absRecord.memberNote,
          rejectedAt: absRecord.rejectedAt,
          startDate: absRecord.startDate,
          type: absRecord.type,
          userId: absRecord.userId
        })
      });
      setTimeout(() => {
        absenseDataObservable.next(membersAbsenseData);
      }, 500);
      
    });
  }
}
