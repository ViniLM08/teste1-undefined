// Importa a biblioteca nodemailer para enviar e-mails
import nodemailer from 'nodemailer';

// Função que lida com a requisição para o endpoint de redefinição de senha
export default async function handler(req, res) {
  // Verifica se o método da requisição é POST
  if (req.method === 'POST') {
    // Desestrutura o email do corpo da requisição
    const { email } = req.body;

    // Verifica se o email foi fornecido
    if (!email) {
      // Se o email não for fornecido, responde com erro 400 (Bad Request)
      return res.status(400).json({ message: 'Email é necessário' });
    }

    // Configura o transporte de e-mails usando o serviço Gmail
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Usa o serviço do Gmail
      auth: {
        user: process.env.EMAIL_USER, // Usuário do e-mail, obtido das variáveis de ambiente
        pass: process.env.EMAIL_PASS, // Senha do e-mail, obtida das variáveis de ambiente
      },
    });

    // Define as opções do e-mail que será enviado
    const mailOptions = {
      from: process.env.EMAIL_USER, // Endereço de e-mail do remetente
      to: email, // Endereço de e-mail do destinatário
      subject: 'Redefinição de Senha', // Assunto do e-mail
      text: 'Clique no link para redefinir sua senha: http://localhost:3000/reset-password', // Corpo do e-mail com o link para redefinir a senha
    };

    try {
      // Envia o e-mail usando o transporte configurado
      await transporter.sendMail(mailOptions);
      // Se o e-mail for enviado com sucesso, responde com status 200 e uma mensagem de sucesso
      res.status(200).json({ message: 'Email de recuperação enviado' });
    } catch (error) {
      // Se houver um erro ao enviar o e-mail, exibe o erro no console e responde com status 500 (Internal Server Error)
      console.error('Erro ao enviar email:', error);
      res.status(500).json({ message: 'Erro ao enviar email' });
    }
  } else {
    // Se o método da requisição não for POST, define os métodos permitidos e responde com status 405 (Method Not Allowed)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
