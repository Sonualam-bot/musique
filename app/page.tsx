import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Music, Headphones, Mic2, Star } from "lucide-react";
import Link from "next/link";
import Appbar from "./components/Appbar";
import Image from "next/image";
import Redirect from "./components/Redirect";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Appbar />
      <Redirect />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
            Resonate with Your Beats
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            Create, share, and discover anime-inspired music. Let the community
            shape the soundtrack of your world!
          </p>
          <Button
            size="lg"
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Join the Resonance <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              How It Resonates
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mic2 className="h-16 w-16 mx-auto mb-4 text-pink-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Create Your Beats
                </h3>
                <p className="text-gray-300">Compose and upload your tracks.</p>
              </div>
              <div className="text-center">
                <Star className="h-16 w-16 mx-auto mb-4 text-pink-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Community Resonance
                </h3>
                <p className="text-gray-300">
                  Let fans vote and boost your favorite tracks.
                </p>
              </div>
              <div className="text-center">
                <Headphones className="h-16 w-16 mx-auto mb-4 text-pink-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Discover New Worlds
                </h3>
                <p className="text-gray-300">
                  Explore a vast library of musique.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-gray-800 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                For Creators & Fans Alike
              </h2>
              <p className="mb-4 text-gray-300">
                Whether you{"'"}re crafting the next anime hit or discovering
                new favorites, AnimeResonance is your stage. Upload, vote, and
                immerse yourself in a world of anime-inspired melodies.
              </p>
              <Button
                variant="secondary"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Explore Features
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://img-musesai.163264.com/pic/202408/QBoLQQ0jum7R.jpg"
                alt="Anime-style music scene"
                height={400}
                width={400}
                className="rounded-lg border-4 border-pink-500 shadow-lg shadow-pink-500/50 h-[400px] w-[400px] object-cover "
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Join the AnimeResonance Community
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Be part of a vibrant community where your music taste shapes the
              playlist. Sign up now and start your journey!
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-gray-700 text-white border-gray-600"
                />
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-gray-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How does voting work?
                </h3>
                <p className="text-gray-300">
                  Users can upvote or downvote tracks. The most popular tracks
                  get more playtime and visibility on the platform.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I upload my own music?
                </h3>
                <p className="text-gray-300">
                  Yes! All users can upload their own anime-inspired tracks for
                  the community to enjoy and vote on.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is it free to use?
                </h3>
                <p className="text-gray-300">
                  We offer both free and premium tiers. The free tier allows you
                  to enjoy and participate in the community with some
                  limitations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How do I get started?
                </h3>
                <p className="text-gray-300">
                  Simply sign up with your email, create a profile, and start
                  exploring or uploading music right away!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2023 AnimeResonance. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
