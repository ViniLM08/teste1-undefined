// Página para redefinir a senha do usuário
import { useState } from 'react'; // Importa o hook useState para gerenciar o estado do componente

// Função principal do componente de redefinição de senha
export default function Resetsenha() {
  // Estados para gerenciar os valores dos campos do formulário, mensagens de erro e sucesso
  const [newsenha, setNewsenha] = useState(''); // Estado para armazenar a nova senha
  const [confirmsenha, setConfirmsenha] = useState(''); // Estado para armazenar a confirmação da nova senha
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro de validação
  const [success, setSuccess] = useState(''); // Estado para armazenar mensagens de sucesso

  // Função para validar a nova senha com critérios específicos
  const validaSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;
    return regex.test(senha);
  };

  // Função chamada ao enviar o formulário de redefinição de senha
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Verifica se as senhas digitadas são iguais
    if (newsenha !== confirmsenha) {
      setError('As senhas não coincidem.'); // Define a mensagem de erro se as senhas não coincidirem
      return;
    }
    // Verifica se a nova senha atende aos critérios de validação
    if (!validaSenha(newsenha)) {
      setError('Senha Inválida'); // Define a mensagem de erro se a senha não for válida
      return;
    }
    setError(''); // Limpa mensagens de erro se tudo estiver correto
    console.log('Senha alterada com sucesso'); // Simula a alteração da senha com sucesso
    setSuccess('Senha alterada com sucesso!'); // Define a mensagem de sucesso
  };

  return (
    // Layout do componente de redefinição de senha
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Redefinir Senha</h2>
        {/* Exibe mensagens de erro ou sucesso, se houver */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="newsenha" className="block text-sm font-medium text-gray-800">Nova Senha</label>
            <input
              type="password" // Corrigido o tipo de input para password
              id="newsenha"
              value={newsenha}
              onChange={(e) => setNewsenha(e.target.value)} // Atualiza o estado da nova senha
              className="block w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="confirmsenha" className="block text-sm font-medium text-gray-800">Confirmar Nova Senha</label>
            <input
              type="password" // Corrigido o tipo de input para password
              id="confirmsenha"
              value={confirmsenha}
              onChange={(e) => setConfirmsenha(e.target.value)} // Atualiza o estado da confirmação da senha
              className="block w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Salvar Nova Senha
          </button>
        </form>
      </div>
    </div>
  );
}
