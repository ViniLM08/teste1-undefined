// Página para redefinir a senha do usuário, acessada com um token de recuperação
import { useState } from 'react'; // Importa o hook useState para gerenciar o estado do componente
import { useRouter } from 'next/router'; // Importa o hook useRouter para acesso e manipulação da URL

// Função principal do componente de redefinição de senha
export default function ResetPassword() {
  const router = useRouter(); // Obtém o roteador para navegação programática
  const { token } = router.query; // Recupera o token da URL para validação de redefinição de senha

  // Estados para armazenar a nova senha, confirmação da senha e mensagens de erro/sucesso
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');

  // Função para validar a nova senha com critérios específicos
  const validatePassword = (password) => {
    // Expressão regular que exige pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;
    return regex.test(password); // Retorna verdadeiro se a senha atender aos critérios, falso caso contrário
  };

  // Função chamada ao enviar o formulário de redefinição de senha
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Verifica se a nova senha atende aos critérios de validação
    if (!validatePassword(password)) {
      setError('Senha inválida. Deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }
    // Verifica se a confirmação da senha corresponde à nova senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Define a mensagem de sucesso e redireciona para a página de login após um breve atraso
    setSuccess('Senha redefinida com sucesso! Redirecionando para o login...');
    setTimeout(() => {
      router.push('/login'); // Navega para a página de login
    }, 3000); // Atraso de 3 segundos para mostrar a mensagem de sucesso
  };

  return (
    // Layout do componente de redefinição de senha
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center text-purple-700">Redefinir Senha</h2>
        {/* Exibe mensagens de erro ou sucesso, se houver */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
            <input
              type="password" // Tipo de input para senha
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da nova senha
              className="block w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-purple-300 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirme a Nova Senha</label>
            <input
              type="password" // Tipo de input para senha
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado da confirmação da senha
              className="block w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-purple-300 text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-700 rounded-xl hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
}
