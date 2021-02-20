import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { User, Role, State } from '../../interfaces/user';
import { Roles } from '../../interfaces/roles';
import { UserService } from 'src/app/services/user/user.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  @Input() user!: User;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private rol!: Roles;
  public role = Object.keys(Role).map( (key, index, array) => ({ label: key, key: (<any>Role)[key]}));
  public state = Object.keys(State).map( key => ({ label: key, key: State}));
  // public tel;
  // public email;
  // public tel;
  // public email;

  constructor(private userService: UserService, private rolesService: RolesService) { }

  ngOnInit(): void {
    this.rolesService
    .getRoles()
    .pipe(take(1))
    .subscribe(roles => {
      if(roles.length > 0){
        this.rol = roles[0]
      } 
    });
  }
  
  private newUser(userFormValue: User){
    // const role=userFormValue.role;
    // console.log(role);
    // const user: User= {
    //   name: userFormValue.name,
    //   lastName: userFormValue.lastName,
    //   cc: userFormValue.cc,
    //   role: userFormValue.role,
    //   state: userFormValue.state,
    //   tel: userFormValue.tel,
    //   email: userFormValue.email,
    // };
    // this.rol = {
    //   name: user.role,
    //   users: [user],
    // };
    // const key = this.userService.addUser(user).key;
    const key = this.userService.addUser(userFormValue);
    const userFormValueKey = {
      ...userFormValue,
      key
    };
    const formattedRoles = {
      ...this.rol,
      users: [...(this.rol.users ? this.rol.users : []), userFormValueKey]
    };
    this.rolesService.editRole(formattedRoles);
    // this.rolesService.addRole(rol);
  }

  private editUser(userFormValue: User) {
    const userFormValueWithKey = { ...userFormValue, $key: this.user.$key };
    const userFormValueWithFormattedKey = { ...userFormValue, key: this.user.$key };
    delete userFormValueWithFormattedKey.$key;
    const moddifiedUsers = this.rol.users
      ? this.rol.users.map(user => {
          return user.$key === this.user.$key ? userFormValueWithFormattedKey : user;
        })
      : this.rol.users;
    const formattedTeam = {
      ...this.rol,
      players: [...(moddifiedUsers ? moddifiedUsers : [userFormValueWithFormattedKey])]
    };
    this.userService.editUser(userFormValueWithKey);
    this.rolesService.editRole(formattedTeam);
  }
  
  onSubmit(userForm: NgForm){
    const userFormValue = {...userForm.value};
    // if(userFormValue.valid){
    // }
    if(this.user){
      this.editUser(userFormValue);
    }else{
      this.newUser(userFormValue);
    }
    window.location.replace("#");
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
