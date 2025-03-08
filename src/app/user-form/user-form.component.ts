import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';


@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() userToEdit: User | null = null;  // Input to edit an existing user
  @Output() userAdded = new EventEmitter<User>();  // Emit event when a user is added

  user: User = { id: 0, name: '', email: '', phone: '' };  // Default user

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userToEdit) {
      this.user = { ...this.userToEdit };  // Set the form values for editing
    }
  }

  saveUser(): void {
    if (this.user.id === 0) {
      this.userService.addUser(this.user).subscribe((newUser) => {
        this.userAdded.emit(newUser);  // Emit event after user is added
        this.resetForm();  // Reset form after adding
      });
    } else {
      this.userService.updateUser(this.user).subscribe(() => {
        this.userAdded.emit(this.user);  // Emit event after user is updated
        this.resetForm();  // Reset form after update
      });
    }
  }

  resetForm(): void {
    this.user = { id: 0, name: '', email: '', phone: '' };  // Clear the form
  }
}

