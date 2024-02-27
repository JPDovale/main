import { Github, LucideIcon } from 'lucide-react'
import { Language } from './stores/app'

export type Project = {
  title: string
  content: {
    [Language.PORTUGUESE_BR]: string
    [Language.ENGLISH]: string
  }[]
  stack: string
  links: { url: string; text: string; Icon: LucideIcon }[]
  image: string
}

export const projects: Project[] = [
  {
    title: 'JPDovale - Main',
    content: [
      {
        'pt-BR': 'O ponto de entrada para o meu mundo programado.',
        'en-US': 'The entry point to my programmed world.',
      },
      {
        'pt-BR':
          'Aqui é o lugar onde eu exponho ideias e exercito a criatividade.',
        'en-US':
          'This is the place where I share ideas and exercise creativity.',
      },
      {
        'pt-BR':
          'Um lugar limpo e sem muitas distrações, esse projeto foi construído de uma forma que facilitasse expor as coisas que faço. Apenas por curiosidade, esse portfólio está integrado com o meu bloco de notas...',
        'en-US':
          'A clean place with few distractions, this project was built in a way that facilitates the showcasing of the things I do. Just out of curiosity, this portfolio is integrated with my notebook...',
      },
      {
        'pt-BR':
          'As coisas por aqui parecem mágica... Eu digito no meu bloco de notas e bum, você está vendo isso na sua tela.',
        'en-US':
          "Things around here seem like magic... I type on my notepad and, boom, you're seeing this on your screen.",
      },
      {
        'pt-BR': 'Seja bem-vindo ao meu mundinho particular.',
        'en-US': 'Welcome to my little world.',
      },
    ],
    stack:
      'Next.js, TailwindCSS, TypeScript, Node.js, PostgreSQL, Prisma, Prisma Studio',
    links: [
      {
        url: 'https://github.com/JPDovale/main',
        text: 'GitHub',
        Icon: Github,
      },
    ],
    image: '/main.png',
  },
  {
    title: 'MagiScrita',
    content: [
      {
        'pt-BR':
          'Um aplicativo desktop que visa facilitar o planejamento de livros.',
        'en-US': 'A desktop application designed to facilitate book planning.',
      },
      {
        'pt-BR':
          'Isso surgiu naturalmente da minha própria necessidade quando estava escrevendo um dos meus livros. Por falta de aplicativos que suprissem a minha falta, eu resolvi criar o meu próprio.',
        'en-US':
          'This arose naturally from my own need when I was writing one of my books. Due to the lack of applications that met my needs, I decided to create my own.',
      },
      {
        'pt-BR':
          'Esse projeto passou por vários estágios e reconstruções, já teve outros nomes até chagar a essa versão. Ele já foi um SAAS posto em produção, o que me gerou um enorme conhecimento sobre áreas como infraestrutura, servidores, código limpo e importância de testes.',
        'en-US':
          'This project has gone through various stages and reconstructions, it has had other names until it reached this version. It has been a SAAS put into production, which has given me immense knowledge about areas such as infrastructure, servers, clean code, and the importance of testing.',
      },
      {
        'pt-BR':
          'Acredito que seja imensurável o tamanho do conhecimento que esse projeto me gerou, por passar por diversos âmbitos, tanto técnicos, como comportamentais, pois eu tinha contato direto com os usuários.',
        'en-US':
          'I believe the extent of knowledge this project has given me is immeasurable, as it spanned various domains, both technical and behavioral, since I had direct contact with users.',
      },
    ],
    stack: 'React, Electron, Node.js, SQLite',
    links: [
      {
        url: 'https://github.com/JPDovale/ms-desktop',
        text: 'GitHub',
        Icon: Github,
      },
      {
        url: 'https://github.com/JPDovale/ms-desktop/releases',
        text: 'Releases',
        Icon: Github,
      },
    ],
    image: '/magiscrita.avif',
  },
  {
    title: 'Smart Share',
    content: [
      {
        'pt-BR':
          'Esse app surgiu de uma "dificuldade" que eu tinha durante a transferência de arquivos de um dispositivo móvel para o meu PC.',
        'en-US':
          "This app originated from a 'difficulty' I experienced when transferring files from a mobile device to my PC.",
      },
      {
        'pt-BR':
          'Eu, particularmente, nunca fui muito fã de serviços de armazenamento como OneDrive ou Google Drive... (Nenhuma razão específica). Para mim era trabalhoso abrir o navegador, subir os arquivos e depois fazer o processo para baixar esses arquivos.',
        'en-US':
          'I, personally, have never been a big fan of storage services like OneDrive or Google Drive... (No specific reason). For me, it was cumbersome to open the browser, upload the files, and then go through the process to download these files.',
      },
      {
        'pt-BR':
          'Por ser adepto aos sistemas Linux, acaba existindo uma certa resistência com integrações a esses sistemas, para que eu pudesse evitar o navegador. Não é impossível fazer uma conexão para que os arquivos de cloud fiquem espelhados no dispositivo, mas minha resistência a eles sempre me fazia postegar essa conexão.',
        'en-US':
          "Being a Linux user, there tends to be some resistance to integrations with these systems, so I could avoid the browser. It's not impossible to set up a connection so that cloud files are mirrored on the device, but my resistance to them always made me postpone this connection.",
      },
      {
        'pt-BR':
          'Então eu poderia usar o cabo, mas as entradas da frente do meu gabinete não funcionam mais e eu definitivamente não queria entrar embaixo da mesa para plugar um cabo toda vez que precisasse transferir um arquivo.',
        'en-US':
          "So I could use a cable, but the front ports of my computer case don't work anymore, and I definitely didn't want to get under the desk to plug in a cable every time I needed to transfer a file.",
      },
      {
        'pt-BR':
          'Com uma mente criativa e muita vontade de implementar algo que envolvesse sokets, lá fui eu criar não só um app, mas sim dois.',
        'en-US':
          'With a creative mind and a strong desire to implement something involving sockets, off I went to create not just one app, but two.',
      },
    ],
    stack: 'React, Electron, Node.js, WebSocket, React Native',
    links: [
      {
        Icon: Github,
        text: 'GitHub Desktop',
        url: 'https://github.com/JPDovale/localShare-desktop',
      },
      {
        Icon: Github,
        text: 'GitHub Mobile',
        url: 'https://github.com/JPDovale/localShare-mobile',
      },
    ],
    image: '/smart_share.avif',
  },
]
