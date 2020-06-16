import bcrypt from 'bcryptjs';


class PasswordCrypt{

    CripografaSenha(senha: string){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);
        return hash
    }

    ComparaSenha(senha: string, senhaCriptografada: string){
        return bcrypt.compareSync(senha, senhaCriptografada);
    }
}

export default PasswordCrypt