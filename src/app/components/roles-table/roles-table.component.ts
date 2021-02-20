import { Component, OnInit } from '@angular/core';
import { RolesService, RolesTableHeaders } from 'src/app/services/roles/roles.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Roles  } from '../../interfaces/roles';
import { Role } from '../../interfaces/user';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})

export class RolesTableComponent implements OnInit {
  public rolesTableHeaders = RolesTableHeaders;
  public showModal = false;
  public roles$!: Observable<Roles[]>

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.roles$ = this.rolesService.getRoles();
  }

  // newRole(){
  //   this.showModal = true;
  //   setTimeout(() => {
  //     window.location.replace('#open');
  //   }, 0);
  // }
}