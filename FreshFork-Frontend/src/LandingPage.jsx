import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Github,
  Star,
  ChefHat,
  Clock,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const TRENDING_RECIPES = [
  {
    id: 1,
    name: "Creamy Truffle Mushroom Pasta",
    rating: 4.9,
    time: "30 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    name: "Charred Citrus Salmon Bowl",
    rating: 4.8,
    time: "25 min",
    level: "Medium",
    image:
      "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    name: "Rustic Sourdough Avocado Toast",
    rating: 4.7,
    time: "15 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/5591715/pexels-photo-5591715.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    name: "Crisp Rainbow Harvest Salad",
    rating: 4.9,
    time: "20 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },  
  {
    id: 5,
    name: "Creamy Truffle Mushroom Pasta",
    rating: 4.9,
    time: "30 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 6,
    name: "Charred Citrus Salmon Bowl",
    rating: 4.8,
    time: "25 min",
    level: "Medium",
    image:
      "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 7,
    name: "Rustic Sourdough Avocado Toast",
    rating: 4.7,
    time: "15 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/5591715/pexels-photo-5591715.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 8,
    name: "Crisp Rainbow Harvest Salad",
    rating: 4.9,
    time: "20 min",
    level: "Easy",
    image:
      "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const COMMUNITY_SHOTS = [
  {
    id: 1,
    user: "@simmerandsoul",
    image:
      "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    user: "@whiskedaway",
    image:
      "https://images.pexels.com/photos/4109994/pexels-photo-4109994.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    user: "@midnightbites",
    image:
      "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    user: "@spoonfulofstory",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 5,
    user: "@pantrypoet",
    image:
      "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 6,
    user: "@cravecollective",
    image:
      "https://images.pexels.com/photos/3731474/pexels-photo-3731474.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const LandingPage = () => {
  const [heroParallax, setHeroParallax] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero parallax
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHeroParallax(Math.min(y * 0.3, 140));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade sections in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".lp-fade")
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Slider auto-play
  useEffect(() => {
    const id = setInterval(
      () => setCurrentSlide(prev => (prev + 1) % TRENDING_RECIPES.length),
      5500
    );
    return () => clearInterval(id);
  }, []);

  const goPrev = () => {
    setCurrentSlide(prev =>
      prev === 0 ? TRENDING_RECIPES.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentSlide(prev => (prev + 1) % TRENDING_RECIPES.length);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-amber-100/60 bg-[#faf7f2]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 text-white shadow-md">
              <ChefHat className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                CulinaryCanvas
              </p>
              <p className="text-[0.7rem] text-slate-500">
                Community recipe studio
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-xs font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#trending" className="hover:text-slate-900">
              Trending
            </a>
            <a href="#community" className="hover:text-slate-900">
              Community
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-xs font-medium text-slate-700 hover:text-slate-900 md:inline"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join free
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background with parallax & gradient orbs */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            transform: `translateY(${heroParallax * 0.4}px)`,
            transition: "transform 0.18s ease-out",
          }}
        >
          <img
            src="https://images.pexels.com/photos/4109994/pexels-photo-4109994.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Fresh ingredients"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2] via-[#faf7f2]/80 to-[#faf7f2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2] via-[#faf7f2]/70 to-transparent" />
          <div className="absolute -left-10 top-24 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute right-[-60px] top-40 h-64 w-64 rounded-full bg-amber-200/50 blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-20 md:flex-row md:items-center md:pb-28 md:pt-24">
          {/* Left */}
          <div className="lp-fade opacity-0 translate-y-6 transition-all duration-700 md:w-3/5">
            <div className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[0.7rem] font-medium text-emerald-700 shadow-sm backdrop-blur">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
              Loved by home cooks in 80+ countries
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.45rem]">
              Discover. Cook.{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                Share.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-700 sm:text-base">
              A community-driven recipe platform where home cooks and food
              lovers share what they&apos;re really making — from comfort classics
              to late-night experiments.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/50 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/add"
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/80 px-6 py-3 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white"
              >
                Create a recipe
              </Link>
            </div>

            {/* Stats + filter tags */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((i, idx) => (
                    <div
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-amber-100 text-[0.6rem] font-semibold text-amber-800 shadow-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-medium text-slate-800">
                    12,000+ recipes shared
                  </div>
                  <div className="text-[0.7rem] text-slate-500">
                    Curated, rated, and cooked by our community.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[0.7rem]">
                {["10-min meals", "Plant-based", "One pot", "Weekend baking"].map(
                  tag => (
                    <button
                      key={tag}
                      className="rounded-full border border-amber-100 bg-white/80 px-3 py-1 text-slate-600 shadow-sm transition hover:border-amber-200 hover:bg-amber-50"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          {/* Right hero card */}
          <div className="lp-fade opacity-0 translate-y-6 transition-all duration-700 delay-150 md:w-2/5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -left-5 -top-6 h-24 w-24 rounded-full bg-emerald-200/60 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-amber-200/70 blur-3xl" />

              <div className="overflow-hidden rounded-3xl bg-white/85 shadow-2xl ring-1 ring-amber-100/60 backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/5591715/pexels-photo-5591715.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Plated dish"
                  className="h-64 w-full object-cover"
                />
                <div className="space-y-3 px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-emerald-700">
                        Today&apos;s spotlight
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        Slow-Roasted Herb Chicken with Citrus Jus
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[0.7rem] font-semibold text-amber-700">
                        <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        4.9
                      </div>
                      <span className="text-[0.65rem] text-slate-500">
                        284 cooks this week
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-[0.7rem] text-slate-600">
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1">
                      <Clock className="mr-1 h-3 w-3" />
                      45 min
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1">
                      Level: Medium
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1">
                      Serves 4
                    </span>
                  </div>

                  <p className="text-[0.7rem] text-slate-600">
                    Shared by <span className="font-semibold">@weekendplate</span> ·
                    tagged as <span className="italic">comfort food</span>.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-12 left-4 w-44 rounded-2xl bg-white/95 p-3 text-[0.7rem] shadow-xl">
                <p className="font-semibold text-slate-800">
                  148 new recipes · <span className="text-emerald-600">today</span>
                </p>
                <p className="mt-1 text-[0.65rem] text-slate-500">
                  From 20-minute lunches to festival feasts, there&apos;s
                  something new every time you log in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES + HOW IT WORKS */}
      <section
        id="features"
        className="lp-fade mx-auto max-w-5xl px-6 pb-16 pt-4 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div className="mb-8 flex flex-col gap-3 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Everything you need to cook, your way
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-600">
            CulinaryCanvas gives you a clean, modern space to save recipes,
            discover new favorites, and share your creations — without the
            clutter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-5 w-5 text-emerald-600" />}
            title="Create recipes"
            description="Capture every detail — ingredients, steps, and pro tips — in a beautifully simple editor."
          />
          <FeatureCard
            icon={<Users className="h-5 w-5 text-amber-600" />}
            title="Explore community"
            description="Filter by mood, cuisine, or difficulty to see what other cooks are making tonight."
          />
          <FeatureCard
            icon={<Bookmark className="h-5 w-5 text-rose-600" />}
            title="Save favorites"
            description="Keep your personal cookbook synced across devices, organized just how you like it."
          />
        </div>

        {/* How it works mini-timeline */}
        <div className="mt-10 rounded-3xl bg-white/80 p-5 text-xs text-slate-600 shadow-sm ring-1 ring-amber-100/60">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-700">
            How it works
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <StepPill index={1} label="Sign up in under a minute" />
            <StepPill index={2} label="Add your first recipe or save a favorite" />
            <StepPill index={3} label="Follow cooks you love & build your cookbook" />
          </div>
        </div>
      </section>

      {/* TRENDING SLIDER */}
      <section
        id="trending"
        className="lp-fade bg-gradient-to-b from-[#faf7f2] to-[#f3ece2] px-6 py-16 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Trending this week
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              A real-time look at what the community can&apos;t stop cooking —
              updated as recipes rise in saves, ratings, and shares.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[0.7rem] text-slate-500">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Smooth auto-rotation with manual controls.
            </div>
          </div>

          <div className="relative md:w-2/3">
            <div className="overflow-hidden rounded-3xl bg-white/85 shadow-xl ring-1 ring-amber-100/60 backdrop-blur">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {TRENDING_RECIPES.map(recipe => (
                  <article
                    key={recipe.id}
                    className="min-w-full md:min-w-[60%] lg:min-w-[50%]"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        <div className="relative h-56 w-full md:h-full">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-full w-full object-cover"
                          />
                          <button className="absolute right-3 top-3 inline-flex items-center rounded-full bg-black/40 px-2 py-1 text-[0.65rem] font-medium text-white backdrop-blur-md">
                            <Heart className="mr-1 h-3 w-3" />
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                            Community favorite
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {recipe.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.7rem]">
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
                              <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              {recipe.rating} rating
                            </span>
                            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-slate-600">
                              <Clock className="mr-1 h-3 w-3" />
                              {recipe.time}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-slate-600">
                              Level: {recipe.level}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-slate-600">
                            Balanced flavors, simple steps, and a huge payoff —
                            perfect for impressing guests with minimal stress.
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[0.7rem]">
                          <button className="inline-flex items-center rounded-full bg-slate-900 px-3 py-2 text-[0.7rem] font-medium text-white shadow-sm transition hover:bg-slate-800">
                            View recipe
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </button>
                          <span className="text-slate-500">
                            Shared by <span className="font-semibold">@foodstories</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 shadow-md backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 text-slate-700" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 shadow-md backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 text-slate-700" />
            </button>

            <div className="mt-4 flex justify-center gap-1.5">
              {TRENDING_RECIPES.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide
                      ? "w-5 bg-emerald-600"
                      : "w-2 bg-emerald-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY MOSAIC */}
      <section
        id="community"
        className="lp-fade mx-auto max-w-5xl px-6 py-16 opacity-0 translate-y-6 transition-all duration-700"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Made by our community
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {COMMUNITY_SHOTS.map((shot, idx) => (
            <div
              key={shot.id}
              className={`group relative overflow-hidden rounded-3xl bg-slate-900/5 ${
                idx % 3 === 1 ? "sm:row-span-2" : ""
              }`}
            >
              <img
                src={shot.image}
                alt={shot.user}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-44 md:h-52"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-emerald-700 shadow">
                  {shot.user[1]?.toUpperCase() || "C"}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {shot.user}
                  </p>
                  <p className="text-[0.7rem] text-white/80">
                    Shared from their kitchen
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="lp-fade relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 px-6 py-14 opacity-0 translate-y-6 transition-all duration-700">
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_white_0,_transparent_55%),radial-gradient(circle_at_bottom,_white_0,_transparent_55%)]" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center text-white">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ready to share your recipe with the world?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-emerald-50">
            Start with one dish — a family classic, a midnight snack, or that
            brunch that finally worked. We&apos;ll help you turn it into a recipe
            others can cook and love.
          </p>
          <Link
            to="/add"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start cooking
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f4eee4] px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 border-t border-amber-100 pt-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-800">CulinaryCanvas</p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              Crafted for home cooks, food bloggers, and midnight snackers
              everywhere.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex gap-4 text-[0.75rem] text-slate-600">
              <button className="hover:text-slate-900">About</button>
              <button className="hover:text-slate-900">Contact</button>
              <button className="hover:text-slate-900">Privacy</button>
              <button className="hover:text-slate-900">
                Community Guidelines
              </button>
            </nav>
            <div className="flex gap-3 text-slate-500">
              <button className="rounded-full bg-white/80 p-1.5 shadow-sm transition hover:text-slate-900">
                <Instagram className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-white/80 p-1.5 shadow-sm transition hover:text-slate-900">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-white/80 p-1.5 shadow-sm transition hover:text-slate-900">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-white/80 p-1.5 shadow-sm transition hover:text-slate-900">
                <Github className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="group rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-amber-100/80 transition hover:-translate-y-1 hover:shadow-xl hover:ring-emerald-100">
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
      {icon}
    </div>
    <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-xs text-slate-600">{description}</p>
  </div>
);

const StepPill = ({ index, label }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[0.7rem] font-medium text-slate-700">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[0.65rem] font-semibold text-emerald-700 shadow-sm">
      {index}
    </span>
    <span>{label}</span>
  </div>
);

export default LandingPage;