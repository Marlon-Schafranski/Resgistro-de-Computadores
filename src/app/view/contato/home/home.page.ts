import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Computadores } from 'src/app/model/entity/Computadores';
import { FirebaseService } from 'src/app/model/service/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaDeComputadores: Computadores[] = [];
  public cor: Boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService,
    private renderer: Renderer2
  ) {
    this.firebase.buscarTodos()
    .subscribe((res) => {
      this.listaDeComputadores = res.map((computadores) => {
        return {
          id: computadores.payload.doc.id,
          ...(computadores.payload.doc.data() as any),
        } as Computadores;
      });
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastrar']);
  }

  editar(computadores: Computadores) {
    this.router.navigateByUrl('/detalhar', {
      state: { computadores: computadores },
    });
  }
}
