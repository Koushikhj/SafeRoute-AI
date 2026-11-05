
import Navbar from "../components/Navbar"
import { ShieldCheck, MapPin, Navigation } from "lucide-react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full mb-6">
            <ShieldCheck size={18} />
            <span className="text-sm">Travel Smarter. Travel Safer.</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Your Journey,
            <span className="text-emerald-400"> Your Safety.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-6 leading-relaxed">
            Plan smarter journeys with intelligent route insights,
            real-time weather information and community safety updates.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-600 px-7 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-600 hover:border-emerald-400 px-7 py-3 rounded-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-8">
            <MapPin className="text-emerald-400" size={28} />
            <div>
              <h2 className="font-bold text-xl">Smart Route Planning</h2>
              <p className="text-slate-400 text-sm">
                Plan with safety in mind
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Starting Point</p>
              <p className="font-semibold mt-1">Your Current Location</p>
            </div>

            <div className="flex justify-center">
              <Navigation className="text-emerald-400" size={25} />
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400 text-sm">Destination</p>
              <p className="font-semibold mt-1">Choose Your Destination</p>
            </div>
          </div>

          <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
            <p className="text-emerald-400 font-semibold">
              <ShieldCheck size={18} className="inline mr-2" />
              Safety-focused travel
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Intelligent travel assistance in one platform.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home
