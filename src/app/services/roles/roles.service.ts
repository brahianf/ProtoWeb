import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Roles } from 'src/app/interfaces/roles';

export const RolesTableHeaders = ['Nombres', 'Identificación (C.C)', ' Rol asociado', 'Estado', 'Teléfono', 'Correo electrónico'];

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesDb: AngularFireList<Roles>
  constructor(private db: AngularFireDatabase) {
    this.rolesDb = this.db.list('/roles', ref => ref.orderByChild('name'));
  }

  getRoles(): Observable<Roles[]> {
    //  Obtain information with primary key of firebase
     return this.rolesDb.snapshotChanges().pipe(
        map(changes => {
          return changes.map(
            (c) => 
            ({
              $key: c.payload.key, ...c.payload.val()
            }) as Roles)
        })
     )
   }

  addRole(role: Roles) {
    return this.rolesDb.push(role)
  }

  deleteRole(id: string){
    this.db.list('/roles').remove(id);
  }

  editRole(newRoleData: Roles){
   const $key = newRoleData.$key;
   if($key){
    delete(newRoleData.$key);
    this.db.list('/roles').update($key, newRoleData);
   }
  }
}
