import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    let _token = '';
    let jwtToken = req.clone({
        setHeaders: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
            Authorization: `Bearer` + _token,
        },
    });
    return next(req);
};
