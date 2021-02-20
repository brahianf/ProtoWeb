import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService, UsersTableHeaders} from 'src/app/services/user/user.service';
import { RolesService } from 'src/app/services/roles/roles.service';

import { State, Role, User } from '../../interfaces/user';
import { Roles } from '../../interfaces/roles';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
  public usersTableHeaders = UsersTableHeaders;
  public users$!: Observable<User[]>
  public selectedUser!: User;
  public showModal = false;

  constructor(private userService: UserService, private rolesService:RolesService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(take(1)).subscribe(users => {
      if(users.length === 0){
        const user: User = {
          name: 'Andrés Felipe',
          lastName: 'Garcia Castro',
          cc: 114485404,
          role: Role.administrador,
          state: State.activo,
          tel: 3165303978,
          email: 'afgarcia@refinal.com',
        };
        this.userService.addUser(user);
        const rol: Roles = {
          name: user.role,
          users: [user],
        };
        this.rolesService.addRole(rol);
      }else{
        this.users$ = this.userService.getUsers();
      }
    })
  }
  newUser(){
    this.showModal = true;
    this.selectedUser = null!;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  
  deleteUser(user: User) {
    this.rolesService
      .getRoles()
      .pipe(take(1))
      .subscribe(roles => {
        const moddifiedUsers = roles[0].users 
        ? roles[0].users.filter((p: any) => p.key !== user.$key) 
        : roles[0].users;
        const formattedTeam = {
          ...roles[0],
          users: [...moddifiedUsers]
        };
        this.userService.deleteUser(user.$key);
        this.rolesService.editRole(formattedTeam);
      });
  }

  closeDialog(){
    this.showModal = false;
  }
}
