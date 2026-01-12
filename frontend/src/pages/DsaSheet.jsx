/**
 * DSA Dashboard
 * Displays topics, progress tracking, filters and learning links
 */
import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function DsaSheet() {
  // Protect route
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Load topics and progress
  useEffect(() => {
    const load = async () => {
      try {
        const topicsRes = await API.get("/topics");
        const progressRes = await API.get("/progress", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setTopics(topicsRes.data);
        setProgress(progressRes.data);
        setLoading(false);
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };
    load();
  }, []);

  // Toggle problem completion

  const toggle = async (id) => {
    await API.post(
      "/progress",
      { topicId: id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    const res = await API.get("/progress", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setProgress(res.data);
  };

  // Check if a topic is completed
  const isDone = (id) => progress.find((p) => p.topicId === id)?.completed;

  // Progress summary
  const completed = progress.filter((p) => p.completed).length;
  const total = topics.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  // Filter logic
  const filteredTopics =
    filter === "All" ? topics : topics.filter((t) => t.level === filter);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading DSA Sheet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* HEADER */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-16"></div>

          <h1 className="text-2xl font-bold text-blue-600 text-center flex-1">
            📘 ApnaCollege DSA Tracker
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="max-w-3xl mx-auto mt-6 mb-4 bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-600">
          You have completed <b>{completed}</b> of <b>{total}</b> problems
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-1">{percent}% completed</p>
      </div>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-8">
        {["All", "Easy", "Medium"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-1 rounded-full text-sm font-semibold transition ${
              filter === f
                ? "bg-blue-600 text-white shadow"
                : "bg-white border hover:bg-blue-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        {filteredTopics.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border"
          >
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {t.title}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.level === "Easy"
                      ? "bg-green-100 text-green-700"
                      : t.level === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.level}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">{t.chapter}</p>

              <div className="flex flex-wrap gap-6 mt-4 text-sm font-medium">
                <a
                  href={t.youtube}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  🎥 YouTube
                </a>
                <a
                  href={t.leetcode}
                  target="_blank"
                  className="text-green-600 hover:underline"
                >
                  💻 Practice
                </a>
                <a
                  href={t.article}
                  target="_blank"
                  className="text-purple-600 hover:underline"
                >
                  📄 Article
                </a>
              </div>

              {isDone(t._id) && (
                <span className="text-xs text-green-600 font-semibold mt-3">
                  ✔ Completed
                </span>
              )}
            </div>

            <input
              type="checkbox"
              checked={isDone(t._id) || false}
              onChange={() => toggle(t._id)}
              className="w-7 h-7 accent-blue-600 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
