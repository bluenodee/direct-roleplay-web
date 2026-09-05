export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 text-center">
      <p className="text-xs text-white/30">
        &copy; {new Date().getFullYear()} Direct Roleplay. Todos os direitos reservados.
      </p>
      <p className="text-xs text-white/20 mt-2">
        Desenvolvido por{' '}
        <a href="https://bluenode.eu.cc" target="_blank" rel="noopener" className="text-[#4db8e8]/60 hover:text-[#4db8e8] transition-colors">
          BlueNode
        </a>
        {' · '}
        <a href="https://discord.com/invite/m2heedjMZf" target="_blank" rel="noopener" className="text-[#4db8e8]/60 hover:text-[#4db8e8] transition-colors">
          Discord
        </a>
      </p>
    </footer>
  );
}
