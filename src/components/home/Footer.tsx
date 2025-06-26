import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-default-200">
      <div className="container relative">
        <p className="py-6 text-center font-medium text-default-900">
          {new Date().getFullYear()} © Fireshield Learning développé&nbsp;
          <span className="text-red-500">❤️</span> par&nbsp;
          <Link
            className="text-primary-700"
            href="https://fireshielsec.com/"
            target="_blank"
          >
            Fireshield Security
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
