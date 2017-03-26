import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathDetailComponent } from './path-detail.component';

describe('PathDetailComponent', () => {
  let component: PathDetailComponent;
  let fixture: ComponentFixture<PathDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
