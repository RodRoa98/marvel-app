import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterUserModel } from '../../models/register-user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  registerUser:RegisterUserModel;

  constructor(private _router: Router, private authService: AuthService) {
    this.registerUser = new RegisterUserModel();
  }
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this._router.navigateByUrl('/app/list');
    }
  }

  register(form: NgForm) {
    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por favor...'
    });
    Swal.showLoading();

    this.authService.registerUser(this.registerUser)
      .subscribe({
        next: (result)=> {
          Swal.close();

          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            text: 'Usuario registrado correctamente'
          });

          this._router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          console.error(err.message);
          Swal.fire('Error al registrar usuario',err.message, 'error');
        } 
      });
  }
}
