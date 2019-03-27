import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
	AuthActionTypes,
	LogIn, LogInSuccess, LogInFailure,
	SignUp, SignUpSuccess, SignUpFailure,
	LogOut,
	GetStatus
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

	constructor(
		private actions: Actions,
		private authService: AuthService,
		private router: Router,
	) { }

	@Effect()
	LogIn: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.LOGIN),
		map((action: LogIn) => action.payload),
		switchMap(payload => {
			return this.authService.logIn(payload.email, payload.password).pipe(
				map((user) => {
					return new LogInSuccess({ token: user.token, email: payload.email });
				}),
				catchError((error) => {
					console.log(error);
					return of(new LogInFailure({ error }));
				})
			);
		})
	);
	@Effect({ dispatch: false })
	LogInSuccess: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.LOGIN_SUCCESS),
		tap((user) => {
			localStorage.setItem('token', user.payload.token);
			this.router.navigateByUrl('/');
		})
	);
	@Effect({ dispatch: false })
	LogInFailure: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.LOGIN_FAILURE)
	);
	@Effect()
	SignUp: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.SIGNUP),
		map((action: SignUp) => action.payload),
		switchMap(payload => {
			return this.authService.signUp(payload.email, payload.password).pipe(
				map((user) => {
					console.log(user);
					return new SignUpSuccess({ token: user.token, email: payload.email });
				}),
				catchError((error) => {
					console.log(error);
					return of(new SignUpFailure({ error }));
				})
			);
		})
	);
	@Effect({ dispatch: false })
	SignUpSuccess: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.SIGNUP_SUCCESS),
		tap((user) => {
			localStorage.setItem('token', user.payload.token);
			this.router.navigateByUrl('/');
		})
	);
	@Effect({ dispatch: false })
	SignUpFailure: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.SIGNUP_FAILURE)
	);
	@Effect({ dispatch: false })
	public LogOut: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.LOGOUT),
		tap((user) => {
			localStorage.removeItem('token');
		})
	);

	@Effect({ dispatch: false })
	GetStatus: Observable<any> = this.actions.pipe(
		ofType(AuthActionTypes.GET_STATUS),
		map((action: GetStatus) => action),
		switchMap(payload => {
			return this.authService.getStatus();
		})
	);

	@Effect({ dispatch: false })
	GetStatus: Observable < any > = this.actions.pipe(
		ofType(AuthActionTypes.GET_STATUS),
		switchMap(payload => {
			return this.authService.getStatus();
		})
	);
}
