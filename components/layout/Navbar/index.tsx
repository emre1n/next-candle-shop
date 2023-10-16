import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        Unique Candles
      </Link>
    </div>
  );
}

export default Navbar;
