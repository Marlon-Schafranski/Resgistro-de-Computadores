import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../../model/service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Computadores } from 'src/app/model/entity/Computadores';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  public computadoresForm: FormGroup;
  public computadores!: Computadores;
  public edicao: boolean = true;
  public imagem: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.computadoresForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      processador: ['', Validators.required],
      placaVideo: [''],
      memoriaRam: [''],
      armazenamento: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.computadores = history.state.computadores;
    this.populateForm();
  }

  populateForm() {
    this.computadoresForm.setValue({
      categoria: this.computadores.categoria,
      processador: this.computadores.processador,
      placaVideo: this.computadores.placaVideo,
      memoriaRam: this.computadores.memoriaRam,
      armazenamento: this.computadores.armazenamento,
    });
  }

  habilitar() {
    this.edicao = !this.edicao;
  }

  uploadFile(event: any) {
    this.imagem = event.target.files;
  }

  editar() {
    if (this.computadoresForm.valid) {
      const formValue = this.computadoresForm.value;
      let novo: Computadores = new Computadores(
        formValue.categoria,
        formValue.processador
      );
      novo.placaVideo = formValue.placaVideo;
      novo.memoriaRam = formValue.memoriaRam;
      novo.armazenamento = formValue.armazenamento;

      novo.id = this.computadores.id;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        novo.downloadURL = this.computadores.downloadURL;
        this.firebase
          .editar(novo, this.computadores.id)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('Erro', 'Erro ao Atualizar Cadastro!');
          });
      }
    } else {
      this.presentAlert(
        'Erro',
        'Categoria e Processador são campos obrigatórios!'
      );
    }
  }

  excluir() {
    this.presentConfirmAlert('ATENÇÃO', 'Deseja excluir o cadastro');
  }

  excluirComputador() {
    this.firebase
      .excluir(this.computadores.id)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert('Error', 'Erro ao excluir o computador');
      });
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de Computadores',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de Computadores',
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancelou');
          },
        },
        {
          text: 'Confirmar',
          role: 'confimar',
          handler: () => {
            this.excluirComputador();
          },
        },
      ],
    });
    await alert.present();
  }
}
