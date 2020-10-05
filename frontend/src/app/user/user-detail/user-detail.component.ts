import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(
    private userService: UserService,
    private actiRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const id = this.actiRoute.snapshot.params['id'];

    if (id) {
      this.user$ = this.userService.getUserByID(id);
    }
  }
}
