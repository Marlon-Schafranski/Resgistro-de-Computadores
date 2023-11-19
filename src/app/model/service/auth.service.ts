import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'; // npm i -g firebase --save
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dadosUsuario!: any;

  constructor(
    private firebase: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.dadosUsuario = user;
        localStorage.setItem('user', JSON.stringify(this.dadosUsuario));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  public logar(email: string, senha: string) {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  public registrar(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public recuperar(senha: string) {
    this.auth.sendPasswordResetEmail(senha);
  }

  public deslogar() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/logar']);
    });
  }

  public logado(): boolean {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return user! == null ? true : false;
  }

  public getUsuarioLogado() {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return user! == null ? user : null;
  }

  public logarComGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public logarComGitHub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }
}
