import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/user';

export const UsersTableHeaders = ['Nombres', 'Apellidos','Identificación (C.C)', ' Rol asociado', 'Estado', 'Teléfono', 'Correo electrónico', 'Acción'];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersDb: AngularFireList<User>
  constructor(private db: AngularFireDatabase) {
    // Access Db of Firebase, access list of user and functionality, ref order by name
    this.usersDb = this.db.list('/users', ref => ref.orderByChild('name'));
   }

   getUsers(): Observable<User[]> {
    //  Obtain information with primary key of firebase
     return this.usersDb.snapshotChanges().pipe(
        map(changes => {
          return changes.map(
            (c) => 
            ({
              $key: c.payload.key, ...c.payload.val()
            }) as User)
        })
     );
   }

   addUser(user: User) {
     return this.usersDb.push(user)
   }

   deleteUser(id: any){
     this.db.list('/users').remove(id);
   }

   editUser(newUserData: any){
    const $key = new newUserData.$key;
    delete(newUserData.$key);
    this.db.list('/users').update($key, newUserData);
   }
}
