import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ THIS IS THE FIX
    HttpClientModule
  ],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      phone: ['']
    });
    
    this.passwordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });

    this.userService.getProfile().subscribe(profile => {
      this.profileForm.patchValue(profile);
    });
    console.log('EditProfileComponent loaded');

  }

  onSave() {
    this.userService.updateProfile(this.profileForm.value).subscribe(() => {
      alert('Profile updated!');
    });
  }

  onPasswordChange() {
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    this.userService.changePassword(this.passwordForm.value).subscribe(() => {
      alert('Password updated!');
    });
  }
}
