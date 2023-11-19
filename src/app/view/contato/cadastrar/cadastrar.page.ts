import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Computadores } from 'src/app/model/entity/Computadores';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { Alert } from 'src/app/common/Alert';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public computadorForm: FormGroup;
  public imagem: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.computadorForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      processador: ['', Validators.required],
      placaVideo: [''],
      memoriaRam: [''],
      armazenamento: [''],
    });
  }

  ngOnInit() {}

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
    if (this.computadorForm.valid) {
      let novo: Computadores = new Computadores(
        this.computadorForm.value.categoria,
        this.computadorForm.value.processador
      );
      novo.placaVideo = this.computadorForm.value.placaVideo;
      novo.memoriaRam = this.computadorForm.value.memoriaRam;
      novo.armazenamento = this.computadorForm.value.armazenamento;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.firebase
          .cadastrar(novo)
          .then(() => this.router.navigate(['/home']))
          .catch((error) => {
            console.log(error);
            this.alertController
              .create({
                header: 'Error',
                message: 'Erro ao salvar o Computador',
                buttons: ['OK'],
              })
              .then((alert) => alert.present());
          });
      }
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'Categoria e processador são obrigatórios',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
