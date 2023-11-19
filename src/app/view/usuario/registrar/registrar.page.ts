import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/Alert';

import { AuthService } from '../../../model/service/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public cadastro!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: Alert,
    private build: FormBuilder
  ) {
    this.cadastro = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cadastro = this.build.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControler() {
    return this.cadastro.controls;
  }

  submitForm() {
    if (!this.cadastro.valid) {
      this.alert.presentAlert('ok', 'Erro ao tentar logar');
    } else {
      this.registrar();
    }
  }

  private registrar() {
    this.authService
      .registrar(this.cadastro.value['email'], this.cadastro.value['senha'])
      .then((res) => {
        this.alert.presentAlert('ok', 'seja bem-vindo');
        this.router.navigate(['/logar']);
      })
      .catch((error) => {
        this.alert.presentAlert('erro', 'erro ao tentar cadastrar');
        console.log(error);
      });
  }
}
