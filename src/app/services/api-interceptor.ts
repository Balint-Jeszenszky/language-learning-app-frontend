import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authService.getAccessToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap({
        next: x => x,
        error: err => {
          console.error(`Error performing request, status code = ${err.status}`);
        }
      })
    );
  }
}
