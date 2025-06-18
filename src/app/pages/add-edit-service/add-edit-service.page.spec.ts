import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditServicePage } from './add-edit-service.page';

describe('AddEditServicePage', () => {
  let component: AddEditServicePage;
  let fixture: ComponentFixture<AddEditServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
