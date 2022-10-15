import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h3>404: Not Found!</h3>
      <p>
        Maaf, sepertinya halaman yang Anda cari tidak tersedia &#128533;.
      </p>
      <Link to="/">Kembali</Link>
    </section>
  );
}

export default NotFoundPage;
