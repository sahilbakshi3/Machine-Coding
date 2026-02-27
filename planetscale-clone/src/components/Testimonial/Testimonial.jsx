import "./Testimonial.css";

export default function Testimonial({ quote, author }) {
  return (
    <div className="testimonial">
      <blockquote className="testimonial-quote">"{quote}"</blockquote>
      <cite className="testimonial-author">— {author}</cite>
    </div>
  );
}
