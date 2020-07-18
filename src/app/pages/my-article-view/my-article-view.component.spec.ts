import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArticleViewComponent } from './my-article-view.component';

describe('MyArticleViewComponent', () => {
  let component: MyArticleViewComponent;
  let fixture: ComponentFixture<MyArticleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArticleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
