import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor(private _router: Router, private authService: AuthService) {
    this.user = new UserModel();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this._router.navigateByUrl('/app/list');
    }
  }

  hide: boolean = true;

  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por favor...'
    });
    Swal.showLoading();

    this.authService.login(this.user)
      .subscribe({
        next: (result) => {
          Swal.close();

          this._router.navigateByUrl('/app/list');
        },
        error: (err) => {
          console.error(err.message);
          Swal.fire('Error al autenticar', err.message, 'error');
        }
      });

  }
}
