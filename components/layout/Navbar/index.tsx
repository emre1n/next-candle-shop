import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Unique Candles
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="#" className="hover:text-base-100">
              About
            </Link>
          </li>

          <li>
            <Link href="#" className="hover:text-base-100">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
