import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];  
  private nextId = 1;  

  constructor() {}

  // Get all users
  getUsers(): Observable<User[]> {
    return of(this.users);  // Returning users as Observable
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    user.id = this.nextId++;  // Assign a unique ID to the new user
    this.users.push(user);
    return of(user);  // Returning the added user as Observable
  }

  // Update an existing user
  updateUser(updatedUser: User): Observable<User> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return of(updatedUser);
    }
    return (null!);  // Return null if user not found
  }

  // Delete a user
  deleteUser(userId: number): Observable<boolean> {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);  // Remove user from array
      return of(true);
    }
    return of(false);  // Return false if user not found
  }

}
