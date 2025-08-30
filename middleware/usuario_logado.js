async function adminLogado(req, res, next) {
   if(!global.emailAdmin){
        res.redirect('/admin');
    }
    next();
}

async function clienteLogado(req, res, next) {
    if(!global.emailCliente || global.emailCliente === ""){
        res.redirect('/');
    }
    next();
}

module.exports = { adminLogado, clienteLogado };