export default function FAQ() {
  const faqs = [
    { question: "How do I make an account?", answer: "Simply log in with any username and password." },
    { question: "Why are servers populated/full?", answer: "This is just decoration, the game is offline." },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <ul className="space-y-4">
        {faqs.map(({ question, answer }, index) => (
          <li key={index} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">{question}</h2>
            <p className="text-lg mt-2">{answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}