import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, MessageSquare, Search, Share2, MessagesSquare } from "lucide-react";
import "../app/globals.css";
import { BackToTop } from "@/components/marketing/BackToTop";
import Navbar from "../app/sections/navbar";
import Footer from "../app/sections/footer";
import { CommentSkeleton, useSkeleton } from "../app/components/skeleton";


type Topic = "Question" | "Tip" | "Showcase" | "Other";

type CommentItem = {
  id: string;
  name: string;
  initials: string;
  timestamp: string;
  topic: Topic;
  body: string;
  likes: number;
};

const seedComments: CommentItem[] = [
  {
    id: "c1",
    name: "Amara O.",
    initials: "AO",
    timestamp: "2 hours ago",
    topic: "Question",
    body: "How do you handle high-volume DMs during launches? Our inbox gets unmanageable in the first hour.",
    likes: 12,
  },
  {
    id: "c2",
    name: "Lukas M.",
    initials: "LM",
    timestamp: "Yesterday",
    topic: "Tip",
    body: "Tip: Use keyword filters to prioritize urgent messages. Anything with \"refund\" or \"order\" jumps to the top of our queue.",
    likes: 31,
  },
  {
    id: "c3",
    name: "Priya S.",
    initials: "PS",
    timestamp: "3 days ago",
    topic: "Showcase",
    body: "We rebuilt our first-line replies around saved answers and the team finally stopped copy-pasting the same three messages all day.",
    likes: 18,
  },
  {
    id: "c4",
    name: "Diego R.",
    initials: "DR",
    timestamp: "1 week ago",
    topic: "Other",
    body: "Curious how other teams split ownership between support and social. Do you keep one shared inbox or separate queues?",
    likes: 7,
  },
];

const filters = ["All", "Questions", "Tips", "Showcase"] as const;
type Filter = (typeof filters)[number];

const filterToTopic: Record<Exclude<Filter, "All">, Topic> = {
  Questions: "Question",
  Tips: "Tip",
  Showcase: "Showcase",
};

const inputClass =
  "w-full min-h-11 rounded-lg bg-[#0f1011] border border-solid border-[#23252a] px-3 py-2 text-[15px] text-[#f7f8f8] placeholder:text-[#8a8f98] outline-none transition-all duration-200 focus-visible:border-[#5e69d1] focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50";

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>(seedComments);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const loadingComments = useSkeleton(800);


  const [form, setForm] = useState({ name: "", email: "", topic: "Question" as Topic, body: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; body?: string }>({});
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Community Comments | Conveero";
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    const previous = meta.getAttribute("content");
    meta.setAttribute(
      "content",
      "Join the Conveero community discussion. Share tips, ask questions, and learn how other teams manage customer DMs.",
    );
    return () => {
      if (previous) meta.setAttribute("content", previous);
    };
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return comments.filter((c) => {
      const matchesFilter = filter === "All" || c.topic === filterToTopic[filter];
      const matchesSearch = !q || c.body.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [comments, filter, search]);

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + (liked[id] ? -1 : 1) } : c)),
    );
  };

  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => nameRef.current?.focus(), 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (!form.body.trim()) next.body = "Please write a comment.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const initials = form.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

    setComments((prev) => [
      {
        id: `local-${Date.now()}`,
        name: form.name.trim(),
        initials: initials || "?",
        timestamp: "Just now",
        topic: form.topic,
        body: form.body.trim(),
        likes: 0,
      },
      ...prev,
    ]);
    setForm({ name: "", email: "", topic: "Question", body: "" });
    setSuccess(true);
  };

  return (
    <div className="conveero-page min-h-screen block bg-[#010102] text-[#f7f8f8]">
      <Navbar />

      <main className="block">
        {/* Hero */}
        <section className="px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-300 mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5e6ad2]">Community</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[2.5rem] font-bold tracking-[-1px] text-[#f7f8f8] lg:text-[3.25rem] lg:leading-[3.375rem]">
              Conversations from the Conveero community
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#d0d6e0] lg:text-lg">
              See how teams are using Conveero to manage customer DMs, share tips, and discuss best practices.
            </p>

            <div className="mt-10 rounded-2xl border border-solid border-[#23252a] bg-[#0f1011] p-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#23252a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#23252a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#23252a]" />
                <span className="ml-3 text-xs text-[#8a8f98]">Community inbox</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Questions", "Tips", "Showcase"].map((label) => (
                  <div key={label} className="rounded-xl border border-solid border-[#23252a] bg-[#141516] p-4">
                    <p className="text-sm font-medium text-[#f7f8f8]">{label}</p>
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded-full bg-[#23252a]" />
                      <div className="h-2 w-3/4 rounded-full bg-[#23252a]" />
                      <div className="h-2 w-1/2 rounded-full bg-[#23252a]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filters + list */}
        <section className="px-6 pb-16 lg:pb-24">
          <div className="max-w-300 mx-auto">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter comments">
                {filters.map((f) => {
                  const selected = filter === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setFilter(f)}
                      className={`min-h-11 rounded-lg px-4 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50 ${
                        selected
                          ? "bg-[#5e6ad2] text-white"
                          : "border border-solid border-[#23252a] bg-[#0f1011] text-[#d0d6e0] hover:bg-[#141516] hover:text-[#f7f8f8]"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>

              <div className="relative sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8f98]" aria-hidden="true" />
                <label htmlFor="comment-search" className="sr-only">
                  Search comments
                </label>
                <input
                  id="comment-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search comments"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-solid border-[#23252a] bg-[#0f1011] p-6">
              {loadingComments ? (
                <div className="space-y-3" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <CommentSkeleton key={i} />
                  ))}
                </div>
              ) : visible.length === 0 ? (

                <div className="mx-auto max-w-md rounded-xl border border-solid border-[#23252a] bg-[#141516] px-6 py-12 text-center">
                  <MessagesSquare className="mx-auto h-8 w-8 text-[#8a8f98]" aria-hidden="true" strokeWidth={1.5} />
                  <p className="mt-4 text-base text-[#d0d6e0]">No comments yet — be the first to share your thoughts.</p>
                  <button
                    type="button"
                    onClick={focusForm}
                    className="mt-6 min-h-11 rounded-lg bg-[#5e6ad2] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#828fff] active:bg-[#5e69d1] outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50"
                  >
                    Write a comment
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {visible.map((c) => (
                    <li key={c.id}>
                      <article className="flex gap-4 rounded-xl border border-solid border-transparent p-4 transition-all duration-200 hover:border-[#23252a] hover:bg-[#141516]">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5e6ad2] to-[#828fff] text-xs font-semibold text-white"
                          aria-hidden="true"
                        >
                          {c.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-sm font-medium text-[#f7f8f8]">{c.name}</span>
                            <span className="text-xs text-[#8a8f98]">{c.timestamp}</span>
                            <span className="rounded-full bg-[#141516] px-2 py-0.5 text-xs text-[#d0d6e0] ring-1 ring-inset ring-[#23252a]">
                              {c.topic}
                            </span>
                          </div>
                          <p className="mt-2 text-base leading-7 text-[#f7f8f8]">{c.body}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleLike(c.id)}
                              aria-pressed={!!liked[c.id]}
                              aria-label={`Like comment by ${c.name}`}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-[#8a8f98] transition-colors duration-200 hover:text-[#f7f8f8] outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50"
                            >
                              <Heart className={`h-4 w-4 ${liked[c.id] ? "fill-[#5e6ad2] text-[#5e6ad2]" : ""}`} />
                              {c.likes}
                            </button>
                            <button
                              type="button"
                              onClick={focusForm}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-[#8a8f98] transition-colors duration-200 hover:text-[#f7f8f8] outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50"
                            >
                              <MessageSquare className="h-4 w-4" />
                              Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/comments#${c.id}`)}
                              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-[#8a8f98] transition-colors duration-200 hover:text-[#f7f8f8] outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50"
                            >
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="px-6 pb-24">
          <div className="max-w-300 mx-auto">
            <div className="max-w-2xl rounded-xl border border-solid border-[#23252a] bg-[#0f1011] p-6">
              <h2 className="text-xl font-bold tracking-[-0.3px] text-[#f7f8f8]">Join the conversation</h2>
              <p className="mt-2 text-sm text-[#8a8f98]">Share a tip, ask a question, or tell us what's working.</p>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-medium text-[#d0d6e0]">
                      Name
                    </label>
                    <input
                      id="c-name"
                      ref={nameRef}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      className={`${inputClass} mt-2`}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-[#f0a58a]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-medium text-[#d0d6e0]">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      className={`${inputClass} mt-2`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-[#f0a58a]">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-topic" className="block text-sm font-medium text-[#d0d6e0]">
                    Topic
                  </label>
                  <select
                    id="c-topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value as Topic })}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="Question">Question</option>
                    <option value="Tip">Tip</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="c-body" className="block text-sm font-medium text-[#d0d6e0]">
                    Comment
                  </label>
                  <textarea
                    id="c-body"
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    aria-invalid={!!errors.body}
                    className={`${inputClass} mt-2 min-h-30 resize-y`}
                  />
                  {errors.body && <p className="mt-1.5 text-xs text-[#f0a58a]">{errors.body}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="min-h-11 rounded-lg bg-[#5e6ad2] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#828fff] active:bg-[#5e69d1] outline-none focus-visible:ring-2 focus-visible:ring-[#5e69d1]/50"
                  >
                    Post comment
                  </button>
                  {success && (
                    <p role="status" className="text-sm text-[#d0d6e0]">
                      Thanks for sharing! Your comment will appear once approved.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
