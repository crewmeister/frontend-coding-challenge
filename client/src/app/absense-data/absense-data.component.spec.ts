import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenseDataComponent } from './absense-data.component';

describe('AbsenseDataComponent', () => {
  let component: AbsenseDataComponent;
  let fixture: ComponentFixture<AbsenseDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenseDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
