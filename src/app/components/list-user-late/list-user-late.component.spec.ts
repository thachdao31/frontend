import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserLateComponent } from './list-user-late.component';

describe('ListUserLateComponent', () => {
  let component: ListUserLateComponent;
  let fixture: ComponentFixture<ListUserLateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserLateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserLateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
