import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-[#FBE8EF]">
      <footer class="flex flex-col md:flex-row items-center text-base mx-auto container justify-center md:justify-between px-4 md:px-6 py-6">
        <div class="md:inline block w-full text-center">
          <span>&#169; 2024. All rights reserved. </span>
          <span id="credits">
            Website by <Link href="/">Mahotshav</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
