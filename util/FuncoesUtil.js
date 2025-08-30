const fs = require('fs');

class FuncoesUtil{
    static emailValido(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    static converterMinutosParaTempo(minutos) {
        const totalSegundos = Math.round(minutos * 60);
        const horas = Math.floor(totalSegundos / 3600);
        const minutosRestantes = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        // adiciona zero à esquerda se necessário
        const pad = n => n.toString().padStart(2, '0');

        return `${pad(horas)}:${pad(minutosRestantes)}:${pad(segundos)}`;
    }

    static dataHoraAtual(){
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    static formatarDataHora(isoDataHora){
        const date = new Date(isoDataHora);

        return date.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo', // ou 'America/Sao_Paulo' dependendo do fuso desejado
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }


    static existeArquivo(caminho){
        if(fs.existsSync(caminho))
        {
            return true;
        }
        return false
    }

    static removerFoto(foto){
        if(foto && FuncoesUtil.fotoValidaParaRemover(foto)){
            FuncoesUtil.removeImagem(foto);
        }
    }

    static fotoValidaParaRemover(foto){
        if(foto !== '/images/assets/avatar.png' && foto !== ''){
            return true;
        }
        return false;
    }

    static removeImagem(caminho){
        const fs = require('fs');
        const path = require('path');

        console.log(caminho);
        
        caminho = caminho.split('/');

        const caminhoImagem = path.join(__dirname, '..', 'public', caminho[1], caminho[2], caminho[3]);

        fs.unlink(caminhoImagem, (err) => {
            if (err) {
                console.error('Erro ao excluir imagem:', err);
            } else {
                // console.log('Imagem excluída com sucesso!');
            }
        });
    }
}

module.exports = { FuncoesUtil };