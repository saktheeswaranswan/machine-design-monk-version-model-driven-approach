import { despak } from './despak';
/**
 * Hooke & Jeeves Pattern Search - find minimum of objective function.
 */
export function patsh(psi, del, delmin, objmin, maxit, tol, store, merit) {
//    console.log('<li>','@@@@@ Start patsh psi=',psi,'del=',del,'delmin=',delmin,'objmin=',objmin,'maxit=',maxit,'store=',store,'merit=',merit,'</li><ul>');
    var s_psi;
    var NCODE;
    var itno = 0;
    var alpha = 1.05;
    var xflag = [];
    for (var i = 0; i < psi.length; i++) {
        xflag[i] = 1;
    }

    function patsh_explore(phi, s, del) {
        var eps = [];
        var s_phi;
        for (let k = 0; k < phi.length; k++) {
            eps[k] = 0.05 * phi[k];
            if (eps[k] === 0.0) {
                eps[k] = 0.05;
            }
            phi[k] = phi[k] + eps[k] * del * xflag[k];
            s_phi = despak(phi, store, merit);
//            console.log('In patsh_explore 1 phi=',phi,'s_phi=',s_phi);
            if (s_phi < s) {
                s = s_phi;
            }
            else {
                xflag[k] = -xflag[k];
                phi[k] = phi[k] + 2.0 * eps[k] * del * xflag[k];
                s_phi = despak(phi, store, merit);
//                console.log('In patsh_explore 2 phi=',phi,'s_phi=',s_phi);
                if (s_phi < s) {
                    s = s_phi;
                } else {
                    phi[k] = phi[k] - eps[k] * del * xflag[k];
                }
            }
        }
        return s;
    }

    s_psi = despak(psi, store, merit); // AKA despak, s_psi: the functional value at the base point
//    console.log('In patsh 1 phi=',phi,'s_phi=',s_phi);
    while (s_psi >= objmin) { // start searching/exploring otherwise Leave by door #1
        var s_phi; // [1]
        var phi = []; // phi: base point resulting from the current move
        for (let i = 0; i < psi.length; i++) {
            phi[i] = psi[i];
        }
        var s = s_psi;// s: the functional value before the move
        s = patsh_explore(phi, s, del); // explore
        itno++; // count the number of explores
        if (s < s_psi) {// goto 2
            do { // [2]
                var tht = [];
                for (let i = 0; i < psi.length; i++) {
                    tht[i] = psi[i];// theta: previous base point
                    psi[i] = phi[i]; // psi: current base point
                    phi[i] = phi[i] + alpha * (phi[i] - tht[i]); // phi: base point resulting from the current move
                }
                s_psi = s; // s_psi: the functional value at the base point
                if (s_psi < objmin) { // Are we done? Leave by door #1
                    NCODE = 'Search terminated when design reached feasibility (Objective value is less than OBJMIN)';
                    if (itno <= 2) {
                        NCODE += '. Low iteration count may produce low precision results.';
                    } else {
                        NCODE += ' after '+itno+' iterations.';
                    }
//                    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                    return NCODE; // stop, design reached feasibility
                }
                if (itno > maxit) { // Are we done? Leave by door #2
                    NCODE = 'Search terminated when iteration count exceeded the maximum limit (MAXIT)';
                    NCODE += ' after '+itno+' iterations.';
//                    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                    return NCODE;// stop, iteration count exceeded
                }
                s_phi = despak(phi, store, merit); // AKA despak, s_phi: the functional value for this move
//                console.log('In patsh 2 phi=',phi,'s_phi=',s_phi);
                s = s_phi; // s: the functional value before the move
                s = patsh_explore(phi, s, del); // explore
                itno++; // count the number of explores
            } while (s < s_psi); // goto 2 else s >= s_psi goto 1
        } else { // s >= s_psi goto 3
            if (del < delmin) { // [3] Are we done? Leave by door #3
                NCODE = 'Search terminated when step size reached the minimum limit (DELMIN)';
                if (itno <= 2)
                    NCODE += '. Low iteration count may produce low precision results.';
                else
                    NCODE += ' after '+itno+' iterations.';
//                console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
                return NCODE;// stop, step size exhausted
            } else {
                del = del / 1.9; // del >= delmin && s >= s_psi goto 1
            }
        }
    } // goto 1
    NCODE = 'Search terminated when design reached feasibility (Objective value is less than OBJMIN)';
    if (itno <= 2) {
        NCODE += '. Low iteration count may produce low precision results.';
    } else {
        NCODE += ' after '+itno+' iterations.';
    }
//    console.log('</ul><li>','@@@@@ End patsh NCODE=',NCODE,'</li>');
    return NCODE; // stop, design reached feasibility
}
