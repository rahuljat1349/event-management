import { LogInIcon, SaveIcon, ShareIcon } from 'lucide-react'
import React from 'react'

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8')] bg-cover bg-center py-24 text-center">
        <h2 className="mb-4 text-5xl font-bold">
          Find, Organize, and Join Amazing Events
        </h2>
        <p className="mb-6 text-xl text-gray-200">
          Discover the best events happening around you or host your own with
          ease!
        </p>
        <a
          href="#cta"
          className="rounded-md bg-yellow-600 px-8 py-4 text-lg font-semibold hover:bg-yellow-500"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="px-12 py-24">
        <h3 className="mb-12 text-center text-4xl font-bold">
          Why Choose HopIn?
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600">
              <LogInIcon size={32} />
            </div>
            <h4 className="mb-2 text-2xl font-semibold">Easy Registration</h4>
            <p>
              Sign up for events with just a few clicks and receive instant
              confirmations.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600">
              <SaveIcon size={32} />
            </div>
            <h4 className="mb-2 text-2xl font-semibold">Save Your Favorites</h4>
            <p>
              Keep track of events you&apos;re interested in by saving them to
              your profile.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600">
              <ShareIcon size={32} />
            </div>
            <h4 className="mb-2 text-2xl font-semibold">Share with Friends</h4>
            <p>Share events with your network and attend together!</p>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="bg-gray-900 px-12 py-24">
        <h3 className="mb-12 text-center text-4xl font-bold text-gray-300">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Event Card */}
          <div className="relative flex w-full flex-row gap-4 rounded-md bg-[#1E1E1E] p-4 duration-200 hover:cursor-pointer hover:bg-[#242424]">
            <span className="absolute right-2 top-2 inline-flex items-center rounded-full bg-green-700 px-2.5 py-1 text-xs font-semibold">
              In-Person
            </span>
            <div className="flex w-[30%] items-center justify-center rounded-md bg-[url('https://images.unsplash.com/photo-1593642634367-d91a135587b5')] bg-cover bg-center"></div>
            <div>
              <div className="flex items-center gap-4 py-2">
                <div className="h-10 w-10 rounded-full bg-[url('https://images.unsplash.com/photo-1517365830460-955ce3ccd263')] bg-cover bg-center"></div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-300">Oleg Ivanov</span>
                  <span className="text-sm text-gray-400">Organizer</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-300">
                  Tech Innovators Summit 2024
                </h2>
                <p className="text-sm text-gray-400">
                  Join us for the Tech Innovators Summit 2024, where industry
                  leaders, tech enthusiasts, and entrepreneurs come together to
                  explore the latest trends in technology and innovation.
                </p>
                <p className="text-sm text-gray-400">Date: 25th October 2024</p>
                <p className="text-sm text-gray-400">
                  Location: Silicon Valley Convention Center, California
                </p>
              </div>
              <div className="flex gap-4 py-2 text-sm font-semibold">
                <button className="flex min-w-20 items-center justify-center gap-1 rounded-md bg-yellow-700 px-4 py-2 text-gray-300 duration-150 hover:bg-yellow-600">
                  <LogInIcon />
                  Register
                </button>
                <button className="flex min-w-20 items-center justify-center gap-1 rounded-md bg-gray-700 px-4 py-2 text-gray-300 duration-150 hover:bg-gray-600">
                  <SaveIcon />
                  Save
                </button>
                <button className="flex min-w-20 items-center justify-center gap-1 rounded-md bg-gray-700 px-4 py-2 text-gray-300 duration-150 hover:bg-gray-600">
                  <ShareIcon />
                  Share
                </button>
              </div>
            </div>
          </div>
          {/* Add more event cards here */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-24 text-center">
        <h3 className="mb-6 text-4xl font-bold">
          Start Hosting or Attending Events Today!
        </h3>
        <p className="mb-8 text-lg">
          Sign up now and become a part of the HopIn community.
        </p>
        <a
          href="#"
          className="rounded-md bg-yellow-600 px-8 py-4 text-lg font-semibold hover:bg-yellow-500"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-2 text-center">
        <p className="text-gray-400">© 2024 EventHub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
