import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IUser, SortBy } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
})
export class UserMainComponent implements OnInit, OnDestroy {
  destroy$: Subject<never> = new Subject();
  after: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  sort: BehaviorSubject<string> = new BehaviorSubject('');

  sortByFields = SortBy;
  isLoading: boolean = true;
  first: number = 12;
  page: number = 1;
  users: IUser[] = [];
  amount: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    combineLatest([this.after, this.sort])
      .pipe(
        //@ts-ignore
        debounceTime(0),
        switchMap(([after, sort]) => {
          this.isLoading = true;
          this.getUsers(after, sort);
          return this.after;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => (this.isLoading = false),
        (err) => (this.isLoading = false),
        () => (this.isLoading = false)
      );

    this.changePage();
  }

  sortChange = (value: string) => this.sort.next(value);

  changePage() {
    return this.activeRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ page }) => {
        if (!Number.isNaN(+page)) {
          let pageNum = +page;
          let after = pageNum === 1 ? 0 : this.first * --pageNum;

          this.after.next(String(after));
          this.page = +page;
        }
      });
  }

  getUsers(after: string, sort: string) {
    this.userService
      .getUsers(String(this.first), after, sort)
      .subscribe(({ users, users_amount }) => {
        this.users = users;
        this.amount = users_amount;
      });
  }

  changeParam(e: number) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { page: e },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
