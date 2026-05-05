export default function ErrorPage({
  code = "Error",
  message = "Something went wrong",
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {code}
        </h1>
        <p className="text-slate-600 mb-6">
          {message}
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
