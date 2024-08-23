import { useState } from 'react';

// Componente para exibir um modal de recuperação de senha
export default function SenhaResetModal({ isOpen, onClose }) {
  // Estado para armazenar o email de recuperação e possíveis mensagens de erro
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');

  // Função para validar o formato do email
  const validaEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Função para lidar com o envio do formulário de recuperação de senha
  const handleResetSenha = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Verifica se o email é válido
    if (!validaEmail(resetEmail)) {
      setResetError('E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.');
      return;
    }
    setResetError(''); // Limpa qualquer mensagem de erro anterior

    try {
      // Envia uma requisição POST para o endpoint de recuperação de senha
      const response = await fetch('/api/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao enviar email');
      }

      // Exibe a mensagem de sucesso no console e fecha o modal
      const result = await response.json();
      console.log(result.message);
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setResetError('Erro ao enviar e-mail. Tente novamente.'); // Define a mensagem de erro
    }
  };

  return (
    // Contêiner do modal, que será exibido quando `isOpen` for true
    <div
      className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
    >
      {/* Estrutura do conteúdo do modal */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Recuperar Senha</h2>
        <form onSubmit={handleResetSenha}>
          <div className="mb-4">
            <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300 text-gray-800"
            />
          </div>
          {resetError && <div className="text-red-500 text-sm mb-2">{resetError}</div>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Enviar Link de Redefinição
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring"
          >
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
}
