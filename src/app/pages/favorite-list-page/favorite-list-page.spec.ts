import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListPage } from './favorite-list-page';

describe('FavoriteListPage', () => {
  let component: FavoriteListPage;
  let fixture: ComponentFixture<FavoriteListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
