
import { Link } from "react-router-dom"
import { ShieldCheck, Menu } from "lucide-react"

function Navbar() {
  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck size={30} className="text-emerald-400" />
          <span className="text-xl font-bold">
            SafeRoute <span className="text-emerald-400">AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-emerald-400">
            Home
          </Link>

          <Link to="/login" className="hover:text-emerald-400">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-lg font-semibold"
          >
            Get Started
          </Link>
        </div>

        <Menu className="md:hidden" size={26} />
      </div>
    </nav>
  )
}

export default Navbar
