// Importa o arquivo de estilos globais para aplicação
import '@/app/globals.css';

// Importa o componente de fonte Poppins da biblioteca do Next.js
import { Poppins } from 'next/font/google';

// Configura a fonte Poppins com os subsets e pesos desejados
const poppins = Poppins({
  subsets: ['latin'], // Define que a fonte deve incluir o subconjunto latino
  weight: ['300', '400', '500', '600', '700'], // Define os pesos da fonte a serem incluídos
});

// Função principal do componente App que envolve toda a aplicação
export default function App({ Component, pageProps }) {
  return (
    // Envolve a aplicação com a fonte Poppins configurada
    <main className={poppins.className}>
      {/* Renderiza o componente da página atual e passa as props da página */}
      <Component {...pageProps} />
    </main>
  );
}
