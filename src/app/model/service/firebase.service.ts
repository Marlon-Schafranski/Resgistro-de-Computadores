import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Computadores } from 'src/app/model/entity/Computadores';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'computadores';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  buscarTodos() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(computadores: Computadores) {
    return this.firestore.collection(this.PATH).add({
      categoria: computadores.categoria,
      processador: computadores.processador,
      placaVideo: computadores.placaVideo,
      memoriaRam: computadores.memoriaRam,
      armazenamento: computadores.armazenamento,
      downloadURL: computadores.downloadURL,
    });
  }

  editar(computadores: Computadores, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      categoria: computadores.categoria,
      processador: computadores.processador,
      placaVideo: computadores.placaVideo,
      memoriaRam: computadores.memoriaRam,
      armazenamento: computadores.armazenamento,
      downloadURL: computadores.downloadURL,
    });
  }
  excluir(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  uploadImage(imagem: any, computadores: Computadores) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/${computadores.categoria}_${file.categoria}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe((resp) => {
            computadores.downloadURL = resp;
            if (!computadores.id) {
              this.cadastrar(computadores);
            } else {
              this.editar(computadores, computadores.id);
            }
          });
        })
      )
      .subscribe();
    return task;
  }
}
