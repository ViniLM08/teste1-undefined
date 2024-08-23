import { useState } from 'react'; // Importa o hook useState para gerenciar o estado do componente
import PasswordResetModal from '../components/senhaResetModal'; // Importa o componente de modal para redefinição de senha

// Função principal do componente Login
export default function Login() {
  // Estados para gerenciar a visibilidade do modal e os valores dos campos do formulário
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar se o modal está aberto ou fechado
  const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
  const [senha, setSenha] = useState(''); // Estado para armazenar a senha do usuário
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro de validação
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha
  const [resetEmail, setResetEmail] = useState(''); // Estado para armazenar o email para redefinição de senha
  const [resetError, setResetError] = useState(''); // Estado para armazenar mensagens de erro de redefinição de senha

  // Função para validar o formato do email
  const validaEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Função para validar a senha com critérios específicos
  const validaSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;
    return regex.test(senha);
  };

  // Função chamada ao enviar o formulário de login
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (!validaEmail(email)) {
      setError('Email inválido, insira um email no formato correto');
      return;
    }
    if (!validaSenha(senha)) {
      setError('Senha Inválida');
      return;
    }
    setError(''); // Limpa mensagens de erro se tudo estiver correto
    console.log('Login bem-sucedido');
  };

  // Função para abrir o modal de recuperação de senha
  const handleEsqueciSenha = () => {
    setIsModalOpen(true);
  };

  // Função chamada ao enviar o formulário de recuperação de senha
  const handleResetSenha = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (!validaEmail(resetEmail)) {
      setResetError('E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.');
      return;
    }
    setResetError(''); // Limpa mensagens de erro se o email estiver correto

    try {
      // Envia uma solicitação POST para a API de redefinição de senha
      const response = await fetch('/api/email-reset-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar email');
      }

      const result = await response.json(); // Recebe a resposta da API
      console.log(result.message); // Exibe a mensagem de sucesso
      setIsModalOpen(false); // Fecha o modal após o sucesso
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setResetError('Erro ao enviar e-mail. Tente novamente.'); // Exibe mensagem de erro se a solicitação falhar
    }
  };

  return (
    // Layout do componente de login
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center text-purple-700">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-purple-300 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'} // Controla a visibilidade dos caracteres da senha
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="block w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-purple-300 text-gray-800"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna a visibilidade da senha
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isPasswordVisible ? 'M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5z' : 'M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5z'} />
                </svg>
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Exibe mensagem de erro se houver */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-700 rounded-xl hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Entrar
          </button>
        </form>
        <button
          type="button"
          onClick={handleEsqueciSenha} // Abre o modal de recuperação de senha
          className="mt-4 text-sm font-medium text-purple-600 hover:underline"
        >
          Esqueci minha senha
        </button>
      </div>

      {/* Renderiza o modal de recuperação de senha se o estado estiver aberto */}
      {isModalOpen && (
        <PasswordResetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onResetSenha={handleResetSenha}
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          resetError={resetError}
        />
      )}
    </div>
  );
}
