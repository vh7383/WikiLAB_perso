import {Component, OnInit} from '@angular/core';
import {User} from "../../../../back/models/user.model";
import {UserService} from "../services/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  newUser: User = {
    id: 0,
    name: '',
    password: '',
    role: ''
  };

    constructor(private userService: UserService,
                private location: Location) { }

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers(): void {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });
    }

    addUser(): void {
      this.userService.register(this.newUser.name, this.newUser.password).subscribe(() => {
        this.newUser = { id: 0, name: '', password: '', role: '' };
        this.loadUsers();
      });
    }

    deleteUser(id: number): void {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }

  goBack(): void {
    this.location.back();
  }

}
