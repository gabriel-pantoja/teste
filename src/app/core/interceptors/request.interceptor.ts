import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ResquestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //this.loadingService.open();
    if (this.authService.isLoggedIn()) {
      req = this.addAuthenticationToken(req);
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          switch (event.status) {
            case 200:
              //this.snackBarService.openSuccess();
              break;
          }
        }
        return event;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        //this.loadingService.close();
        switch (errorResponse.status) {
          case 0:
            //this.snackBarService.openFailure('Servidor sem resposta');
            return throwError(() => new Error(errorResponse.error));
          case 400:
            if (errorResponse.error instanceof Blob) {
              //this.snackBarService.openFailure('Arquivo não encontrado');
            } else {
              //this.snackBarService.openFailure('Erro no servidor');
            }
            return throwError(() => new Error(errorResponse.error))
          case 401:
            //this.snackBarService.openWarnin('Falha na autenticação do usuario');
            return throwError(() => new Error(errorResponse.error))
          case 403:
            //this.snackBarService.openWarnin(error.error.message);
            return throwError(() => new Error(errorResponse.error))
          case 404:
            return throwError(() => new Error(errorResponse.error))
          case 500:
            if (errorResponse.error.token) {
              this.router.navigate(['/login']);
              //this.snackBarService.openFailure('Token inválido');
            }
            return throwError(() => new Error(errorResponse.error));
        }
        return throwError(() => new Error(errorResponse.error));
      }),
      finalize(() => /*this.loadingService.close()*/true)
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `${this.authService.token}` },
    });
  }

}
