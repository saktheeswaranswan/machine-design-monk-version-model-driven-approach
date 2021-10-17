import { despak } from './despak';
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
export function patsh(psi, del, delmin, objmin, maxit, tol, store, merit) {
    var NCODE;
    var spi;
    var xflag = [];
    function patsh_explore(phi, s, del) {
        var eps = [];
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] === 0.0)
                eps[k] = 0.05;
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            spi = despak(phi, store, merit);
            if (spi < s) {
                s = spi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                spi = despak(phi, store, merit);
                if (spi < s) {
                    s = spi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
        return s;
    }
    var itno = 0;
    var alpha = 1.05;
    for (var i = 0; i < psi.length; i++)
        xflag[i] = 1;
    var phi = [];
    for (let i = 0; i < psi.length; i++)
        phi[i] = psi[i];
    var ssi = despak(phi, store, merit);
    while (ssi !== Number.POSITIVE_INFINITY && ssi >= objmin) {
        var s = ssi;
        phi = [];
        for (let i = 0; i < psi.length; i++)
            phi[i] = psi[i];
        s = patsh_explore(phi, s, del);
        while (ssi !== Number.POSITIVE_INFINITY && s >= objmin && s + tol * Math.abs(ssi) < ssi) {
            ssi = s;
            if (s >= objmin) {
                itno++;
                if (itno > maxit) {
                    NCODE = 'Search terminated when iteration count exceeded the maximum limit (MAXIT)';
                    NCODE += ' after '+itno+' iterations.';
                    return NCODE;
                }
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];
                    psi[i] = phi[i];
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]);
                }
                spi = despak(phi, store, merit);
                s = spi;
                s = patsh_explore(phi, s, del);
            }
        }
        if (ssi === Number.POSITIVE_INFINITY || s + tol * Math.abs(ssi) >= ssi) {
            if (del < delmin) {
                NCODE = 'Search terminated when step size reached the minimum limit (DELMIN)';
                if (itno <= 2)
                    NCODE += '. Low iteration count may produce low precision results.';
                else
                    NCODE += ' after '+itno+' iterations.';
                return NCODE;
            }
            del = del / 1.9;
        }
        ssi = s;
    }
    if (ssi === Number.POSITIVE_INFINITY) {
        NCODE = 'Not valid';
    } else {
        NCODE = 'Search terminated when design reached feasibility (Objective value is less than OBJMIN)';
        if (itno <= 2)
            NCODE += '. Low iteration count may produce low precision results.';
        else
            NCODE += ' after '+itno+' iterations.';
    }
    for (let i = 0; i < psi.length; i++)
        psi[i] = phi[i];
    return NCODE;
}
